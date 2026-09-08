<?php
/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  The two enquiry forms, on cPanel.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  This is src/app/api/sample-request/route.ts and src/app/api/contact/
 *  route.ts, in the one language a cPanel host is guaranteed to have. Same
 *  order of checks, same limits, same JSON contract:
 *
 *    2xx            accepted
 *    {"error": …}   shown to the sender as-is
 *
 *  ── SET THIS UP ───────────────────────────────────────────────────────────
 *  1. Put the real addresses in $CONFIG below.
 *  2. $FROM must be a mailbox ON THIS DOMAIN. A From: of gmail.com sent from
 *     a cPanel server fails DMARC and is dropped, usually silently.
 *  3. Send yourself one of each form before announcing the site.
 *
 *  The rate-limit and log directory is created next to this file and is
 *  protected by its own .htaccess. If the site is ever served from a folder
 *  where PHP cannot write, both degrade rather than fail: the limiter lets
 *  the request through and the log is skipped. Neither is worth losing a real
 *  enquiry over.
 */

declare(strict_types=1);

/* mbstring is normally present and is not guaranteed. Length checks are the
   only thing that needs it, and strlen over-counts multibyte characters,
   which errs towards rejecting something too long rather than accepting it. */
if (!function_exists('mb_strlen')) {
    function mb_strlen($s, $enc = null) { return strlen($s); }
}

$CONFIG = [
    /* Where enquiries are delivered. Real mailboxes, created in cPanel on
       the society's own account 2026-09-08. */
    'sample_to' => 'marketing@gathaithi.cloud',
    'contact_to' => 'office@gathaithi.cloud',

    /* MUST stay on gathaithi.cloud. The domain publishes DMARC p=quarantine
       with aspf=s, so a From: anywhere else is silently filed as spam rather
       than bounced — the form would look broken while working perfectly. */
    'from' => 'Gathaithi website <website@gathaithi.cloud>',

    /* Requests per IP per hour, matching src/lib/rate-limit.ts. */
    'limit' => 5,
    'window' => 3600,

    /* Anything filled in faster than this is a script, matching MIN_FILL_MS
       in src/lib/enquiry.ts. */
    'min_fill_ms' => 2500,

    'store' => __DIR__ . '/.enquiry-store',
];

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function fail($code, $message)
{
    http_response_code($code);
    echo json_encode(['error' => $message]);
    exit;
}

function ok()
{
    http_response_code(200);
    echo json_encode(['ok' => true]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fail(405, 'Method not allowed.');
}

$raw = file_get_contents('php://input');
$body = json_decode($raw === false ? '' : $raw, true);
if (!is_array($body)) {
    fail(400, 'Malformed request.');
}

/* ── 1. Rate limit, by IP, fixed window ──────────────────────────────────── */

$store = $CONFIG['store'];
if (!is_dir($store)) {
    @mkdir($store, 0750, true);
    @file_put_contents($store . '/.htaccess', "Require all denied\n");
}

/* Longhand on purpose: `a ?? b ?: c` without brackets is a PARSE ERROR in
   PHP 8, and a parse error here is a blank page rather than a caught bug. */
$ip = '';
if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
    $ip = (string) $_SERVER['HTTP_CF_CONNECTING_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $parts = explode(',', (string) $_SERVER['HTTP_X_FORWARDED_FOR']);
    $ip = $parts[0];
} elseif (!empty($_SERVER['REMOTE_ADDR'])) {
    $ip = (string) $_SERVER['REMOTE_ADDR'];
}
if ($ip === '') {
    $ip = 'unknown';
}

$bucket = $store . '/rl_' . hash('sha256', trim($ip)) . '.json';
$now = time();

if (is_writable($store)) {
    $window = ['count' => 0, 'reset' => $now + $CONFIG['window']];
    if (is_file($bucket)) {
        $decoded = json_decode((string) @file_get_contents($bucket), true);
        if (is_array($decoded) && ($decoded['reset'] ?? 0) > $now) {
            $window = $decoded;
        }
    }

    if ($window['count'] >= $CONFIG['limit']) {
        header('Retry-After: ' . max(1, $window['reset'] - $now));
        fail(429, 'Too many requests from this connection. Please try again later, or email us directly.');
    }

    $window['count']++;
    @file_put_contents($bucket, json_encode($window), LOCK_EX);

    /* Sweep expired buckets occasionally so the folder cannot grow forever. */
    if (random_int(1, 50) === 1) {
        foreach (glob($store . '/rl_*.json') ?: [] as $old) {
            $d = json_decode((string) @file_get_contents($old), true);
            if (!is_array($d) || ($d['reset'] ?? 0) <= $now) {
                @unlink($old);
            }
        }
    }
}

/* Scalars only. A posted value can legitimately be an array or null in JSON,
   and casting an array to string is fatal in PHP 8 — this is the boundary
   where untrusted shapes stop. */
$value = function ($key) use ($body) {
    if (!isset($body[$key]) || !is_scalar($body[$key])) {
        return '';
    }
    return trim((string) $body[$key]);
};

/* ── 2. Honeypot ─────────────────────────────────────────────────────────── */
/* A hidden field no person can see. Accept the request so the bot learns
   nothing, and deliver nothing. */
if ($value('website') !== '') {
    ok();
}

/* ── 3. Filled in impossibly fast ────────────────────────────────────────── */
$elapsed = is_numeric($body['elapsedMs'] ?? null) ? (float) $body['elapsedMs'] : PHP_INT_MAX;
if ($elapsed < $CONFIG['min_fill_ms']) {
    ok();
}

/* ── 4. Validation, against the same rules as src/lib/enquiry.ts ─────────── */

/** [required, min length, max length, must be an email] */
const RULES = [
    'sample' => [
        'pack' => [false, 0, 40, false],
        'email' => [true, 0, 200, true],
        'message' => [true, 12, 4000, false],
    ],
    'contact' => [
        'name' => [true, 0, 120, false],
        'email' => [true, 0, 200, true],
        'phone' => [false, 0, 40, false],
        'organisation' => [false, 0, 160, false],
        'topic' => [true, 0, 60, false],
        'memberNumber' => [false, 0, 40, false],
        'message' => [true, 12, 4000, false],
    ],
];

$form = ($_GET['form'] ?? '') === 'contact' ? 'contact' : 'sample';
$values = [];

foreach (RULES[$form] as $field => [$required, $min, $max, $isEmail]) {
    $v = $value($field);
    $values[$field] = $v;

    if ($v === '') {
        if ($required) {
            fail(422, $field . ': This field is required.');
        }
        continue;
    }
    if (mb_strlen($v) > (int) $max) {
        fail(422, $field . ': That value is longer than we can accept.');
    }
    /* Values that end up in mail headers must not carry line breaks — this is
       the check that stops a header-injection attempt reaching mail(). */
    if (preg_match('/[\r\n]/', $v) === 1) {
        fail(422, $field . ': That value contains characters we cannot accept.');
    }
    if ($isEmail && !filter_var($v, FILTER_VALIDATE_EMAIL)) {
        fail(422, $field . ': That email address does not look right.');
    }
    if ((int) $min > 0 && mb_strlen($v) < (int) $min) {
        fail(422, $field . ': Please tell us a little more.');
    }
}

/* ── 5. Record, then deliver ─────────────────────────────────────────────
 *
 * THE ORDER MATTERS AND IT USED TO BE WRONG. The log was written AFTER the
 * send, so anything that killed the send took the record with it — which is
 * exactly what happened the first time a valid enquiry reached this file: a
 * 500, and nothing on disk to say a message had ever arrived. An enquiry is
 * the whole point of the page; it is written down BEFORE anything is risked.
 */

$submitted = gmdate('c');

if ($form === 'sample') {
    $to = $CONFIG['sample_to'];
    $subject = 'Coffee enquiry'
        . ($values['pack'] !== '' ? ' — ' . $values['pack'] : '')
        . ' — ' . $values['email'];
    $lines = [
        'New enquiry from the Our Coffee page',
        '',
        'Email:     ' . $values['email'],
        'Pack:      ' . ($values['pack'] !== '' ? $values['pack'] : '—'),
    ];
} else {
    $to = $CONFIG['contact_to'];
    $subject = 'Website enquiry — ' . $values['name'];
    $lines = [
        'New enquiry from the contact page',
        '',
        'Name:      ' . $values['name'],
        'Email:     ' . $values['email'],
        'Phone:     ' . ($values['phone'] !== '' ? $values['phone'] : '—'),
        'Org:       ' . ($values['organisation'] !== '' ? $values['organisation'] : '—'),
        'Topic:     ' . $values['topic'],
        'Member no: ' . ($values['memberNumber'] !== '' ? $values['memberNumber'] : '—'),
    ];
}

$lines = array_merge($lines, [
    '',
    'Message:',
    $values['message'],
    '',
    '—',
    'Submitted: ' . $submitted,
]);

/** Appends to the log, and never throws. */
$record = function ($status, $detail = '') use ($store, $submitted, $form, $lines) {
    if (!is_writable($store)) {
        return;
    }
    @file_put_contents(
        $store . '/enquiries.log',
        '[' . $submitted . '] ' . $status . ($detail !== '' ? ' (' . $detail . ')' : '')
            . ' ' . $form . "\n" . implode("\n", $lines) . "\n\n" . str_repeat('-', 60) . "\n",
        FILE_APPEND | LOCK_EX
    );
};

$record('RECEIVED');

/* ── 6. Send ────────────────────────────────────────────────────────────
 *
 * `@mail(...)` was not enough. The @ operator suppresses WARNINGS; it does
 * nothing about an Error, and on a host where mail() is disabled through
 * disable_functions — common on shared hosting, which is what this is —
 * calling it is a fatal, which PHP answers with a bare 500 and an HTML error
 * page. The browser then shows "that didn't send" with no idea why.
 *
 * So: check the function exists, catch anything it throws anyway, and answer
 * in JSON either way. The enquiry is already on disk by this point, so a
 * failure here costs the reply, not the enquiry.
 */

$headers = [
    'From: ' . $CONFIG['from'],
    'Reply-To: ' . $values['email'],
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    'X-Mailer: gathaithi-site',
];

if (!function_exists('mail')) {
    $record('MAIL-DISABLED', 'mail() is not available on this host');
    fail(502, 'The site could not hand your message to the mail server. It has been recorded and the office has been alerted — or email us directly.');
}

$sent = false;
$why = '';
try {
    $sent = @mail(
        $to,
        '=?UTF-8?B?' . base64_encode($subject) . '?=',
        implode("\n", $lines),
        implode("\r\n", $headers)
    );
} catch (Throwable $e) {
    $sent = false;
    $why = get_class($e) . ': ' . $e->getMessage();
}

$record($sent ? 'SENT' : 'MAIL-FAILED', $why);

if (!$sent) {
    fail(502, 'We could not send that just now. Please try again, or email the office directly.');
}

ok();
