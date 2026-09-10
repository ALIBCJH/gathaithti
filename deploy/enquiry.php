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

/**
 * Bumped whenever this file changes in a way worth confirming on a server.
 * A GET returns it, so "is the fix actually uploaded?" is a question with an
 * answer instead of an inference from which error code came back. That guess
 * cost a round trip once already.
 */
const HANDLER_VERSION = '2026-09-10.7-limit20';

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

    /* ── SMTP ────────────────────────────────────────────────────────────
     * This host DISABLES PHP's mail(). Confirmed on 2026-09-08: a GET to this
     * file reports `"mail":"DISABLED ON THIS HOST"`, and calling it was the
     * fatal behind the 500 the first live enquiry hit. That is ordinary on
     * shared hosting — it is how a provider stops one compromised account
     * spamming from the whole server.
     *
     * So the mail is handed to the mail server the same way a phone does it:
     * authenticated SMTP over TLS, as website@gathaithi.cloud. It is also the
     * better route — the message is signed by the domain's own server, which
     * is what DKIM and that strict DMARC policy expect.
     */
    'smtp_host' => 'mail.gathaithi.cloud',
    'smtp_port' => 465,
    'smtp_user' => 'website@gathaithi.cloud',

    /* Requests per IP per hour, matching src/lib/rate-limit.ts.
       Counted per INTERNET CONNECTION, not per person: an office, a college
       or a cyber cafe all share one address, so a low number turns "several
       people wrote in today" into "please try again later" for everybody
       after the fifth. Five was too tight and locked out real visitors twice.
       The honeypot and the minimum fill time are what actually stop bots;
       this only blunts a flood. */
    'limit' => 20,
    'window' => 3600,

    /* Anything filled in faster than this is a script, matching MIN_FILL_MS
       in src/lib/enquiry.ts. */
    'min_fill_ms' => 2500,

    'store' => __DIR__ . '/.enquiry-store',
];

/* ── THE PASSWORD LIVES IN ITS OWN FILE, AND IS NEVER EXECUTED ────────────
 *
 * Not in this one, because this handler gets re-uploaded whenever the site is
 * rebuilt and would wipe a password kept inside it.
 *
 * IT IS READ AS TEXT, NOT `require`d, AND THAT IS THE IMPORTANT PART. It used
 * to be required, which meant the file had to be valid PHP — so a password
 * containing an apostrophe, or a missing semicolon, was a PARSE ERROR in a
 * file the handler pulls in near the top. That does not fail politely: it
 * takes the whole endpoint down with a bare 500, including the diagnostic that
 * would have explained it. It happened. Asking somebody to hand-write PHP
 * syntax for a password was the mistake, so the syntax is no longer required.
 *
 * Anything reasonable in public_html/.mail-password.php now works:
 *
 *     <?php return 'the password';        the documented form
 *     <?php return "the password";        double quotes
 *     the password                        the bare password on its own
 *
 * Only the OUTERMOST pair of quotes is stripped, so quotes inside a password
 * survive. The .php extension is kept for one reason: PHP files are executed
 * rather than served, so the password cannot be fetched over the web even if
 * the leading dot is ignored.
 */
$SECRET_FILE = __DIR__ . '/.mail-password.php';
$CONFIG['smtp_pass'] = '';

if (is_file($SECRET_FILE)) {
    $secret = (string) @file_get_contents($SECRET_FILE);
    /* Strip a PHP wrapper if there is one; accept a bare password if not. */
    $secret = preg_replace('/^\s*<\?php\s*/i', '', $secret);
    $secret = preg_replace('/^\s*return\s+/i', '', (string) $secret);
    $secret = preg_replace('/\s*;?\s*(\?>)?\s*$/', '', (string) $secret);
    $secret = trim((string) $secret);

    /* One matching pair of surrounding quotes, and one only. */
    if (strlen($secret) >= 2) {
        $first = $secret[0];
        if (($first === "'" || $first === '"') && substr($secret, -1) === $first) {
            $secret = substr($secret, 1, -1);
        }
    }

    $CONFIG['smtp_pass'] = $secret;
}

/* ── WHOSE REQUEST IS THIS? ────────────────────────────────────────────────
 *
 * This got the whole form wrong once, so it is worth the words. The limiter
 * keyed on REMOTE_ADDR, and on this host LiteSpeed proxies through 127.0.0.1 —
 * the same value for every visitor on earth. Five diagnostic requests from one
 * laptop therefore used up the allowance for EVERYBODY, and the next person to
 * open the contact page was told "too many requests from this connection".
 * A rate limiter that cannot tell two people apart is not a rate limiter, it
 * is an outage on a timer.
 *
 * So: try the headers a proxy sets, in order of how much they can be trusted,
 * and take the first that is a real, routable address. Longhand rather than
 * `a ?? b ?: c`, which is a PARSE ERROR in PHP 8 — and a parse error here is a
 * blank page rather than a caught bug.
 */
$ipSource = 'none';
$ip = '';
foreach (
    [
        'HTTP_CF_CONNECTING_IP',   // Cloudflare
        'HTTP_TRUE_CLIENT_IP',
        'HTTP_X_REAL_IP',
        'HTTP_X_FORWARDED_FOR',    // may be a chain; the client is first
        'REMOTE_ADDR',
    ] as $header
) {
    if (empty($_SERVER[$header])) {
        continue;
    }
    $candidate = trim(explode(',', (string) $_SERVER[$header])[0]);

    /* Loopback and LAN addresses identify the proxy, not the visitor. Taking
       one would put every visitor in the same bucket, which is the bug. */
    $routable = filter_var(
        $candidate,
        FILTER_VALIDATE_IP,
        FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE
    );
    if ($routable !== false) {
        $ip = $candidate;
        $ipSource = $header;
        break;
    }
}

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

/**
 * Hands one message to the mail server over authenticated TLS.
 *
 * Written out rather than pulled in, because this handler is ONE FILE that
 * gets uploaded on its own. A library would mean a vendor directory to keep in
 * step with it, and the protocol below is four commands and a full stop.
 *
 * `$why` is filled with the server's own reply when a step fails, so the log
 * says "AUTH: 535 Incorrect authentication data" rather than "it did not
 * work". That sentence is the difference between a two-minute fix and an
 * afternoon.
 */
function smtp_send(array $cfg, $to, $subject, $body, array $headers, &$why)
{
    $why = '';

    $context = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]]);
    $fp = @stream_socket_client(
        'ssl://' . $cfg['smtp_host'] . ':' . $cfg['smtp_port'],
        $errno,
        $errstr,
        20,
        STREAM_CLIENT_CONNECT,
        $context
    );
    if (!$fp) {
        $why = 'connect: ' . $errstr . ' (' . $errno . ')';
        return false;
    }
    stream_set_timeout($fp, 20);

    /* A reply can run to several lines; only the last has a space in the
       fourth column. Reading one line and moving on desynchronises everything
       that follows. */
    $read = function () use ($fp) {
        $out = '';
        while (($line = fgets($fp, 1024)) !== false) {
            $out .= $line;
            if (strlen($line) < 4 || $line[3] !== '-') {
                break;
            }
        }
        return $out;
    };
    $send = function ($line) use ($fp, $read) {
        fwrite($fp, $line . "\r\n");
        return $read();
    };

    $steps = [
        ['greeting', $read(), '220'],
        ['EHLO', $send('EHLO ' . $cfg['smtp_host']), '250'],
        ['AUTH', $send('AUTH LOGIN'), '334'],
        ['username', $send(base64_encode($cfg['smtp_user'])), '334'],
        ['password', $send(base64_encode($cfg['smtp_pass'])), '235'],
        ['MAIL FROM', $send('MAIL FROM:<' . $cfg['smtp_user'] . '>'), '250'],
        ['RCPT TO', $send('RCPT TO:<' . $to . '>'), '250'],
        ['DATA', $send('DATA'), '354'],
    ];
    foreach ($steps as $step) {
        if (strncmp((string) $step[1], $step[2], 3) !== 0) {
            $why = $step[0] . ': ' . trim((string) $step[1]);
            fclose($fp);
            return false;
        }
    }

    /* CRLF line endings, and a leading full stop on a line of its own doubled —
       a bare one ENDS the message, so a member writing a sentence that begins
       with "." would truncate their own enquiry. */
    $data = implode("\r\n", $headers) . "\r\n"
        . 'To: ' . $to . "\r\n"
        . 'Subject: ' . $subject . "\r\n"
        . 'Date: ' . date('r') . "\r\n"
        . "\r\n"
        . preg_replace('/^\./m', '..', str_replace(["\r\n", "\n"], ["\n", "\r\n"], $body));

    fwrite($fp, $data . "\r\n.\r\n");
    $final = $read();
    if (strncmp((string) $final, '250', 3) !== 0) {
        $why = 'send: ' . trim((string) $final);
        fclose($fp);
        return false;
    }

    @fwrite($fp, "QUIT\r\n");
    fclose($fp);
    return true;
}

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
    /* Also the deployment check. Loading this URL in a browser proves three
       things at once: the file parses, PHP is executing it rather than serving
       it as text, and WHICH version of it is live. */
    http_response_code(405);
    echo json_encode([
        'error' => 'Method not allowed.',
        'handler' => HANDLER_VERSION,
        'mail' => function_exists('mail') ? 'available' : 'DISABLED ON THIS HOST',
        'transport' => 'smtp',
        /* The LENGTH, never the password. Enough to see that the file was
           read and that what came out of it is a plausible shape — a length of
           0 means missing or empty, and a length that is not what was typed
           means the wrapper was stripped wrongly. */
        'smtp_password_file' => $CONFIG['smtp_pass'] !== ''
            ? 'present (' . strlen($CONFIG['smtp_pass']) . ' characters)'
            : 'MISSING or empty — create .mail-password.php',
        /* Your own address, and which header carried it. If this says
           "none", the host hides the visitor behind a proxy and the per-IP
           limit is off — see the block that works this out. */
        'you' => $ip !== '' ? $ip : 'not identifiable',
        'ip_source' => $ipSource,
        'rate_limit' => $ip !== '' ? 'on' : 'off (visitors indistinguishable)',
    ]);
    exit;
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

$bucket = $store . '/rl_' . hash('sha256', $ip) . '.json';
$now = time();

/* NO IDENTIFIABLE VISITOR, NO PER-IP LIMIT. If every request looks like the
   same one, a limit does not slow an abuser down — it locks out everybody else
   after five submissions and leaves the form apparently broken. The honeypot
   and the too-fast-to-be-human check still stand, and they are what actually
   catch scripts; this one only ever throttled volume. */
if ($ip !== '' && is_writable($store)) {
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

/* ── 6. Send, over SMTP ─────────────────────────────────────────────────
 *
 * NOT mail(). This host disables it — a GET to this file reports
 * "DISABLED ON THIS HOST" — and calling it is a fatal, which is what turned
 * the first live enquiry into a bare 500. The message goes to the mail server
 * the way a phone sends one: authenticated, over TLS, as website@.
 *
 * The enquiry is already on disk by this point, so anything below costs the
 * reply and not the enquiry.
 */

/* Every message needs its own Message-ID. Leaving it off is what a bulk
   sender does and what a mail client never does, so SpamAssassin scores the
   absence directly (MISSING_MID) — which is how the first live enquiries came
   to sit in Junk marked ***SPAM*** while the send itself had succeeded.
   The domain is taken from the From: address so the two cannot drift apart. */
$fromDomain = 'gathaithi.cloud';
if (preg_match('/@([A-Za-z0-9.\-]+)/', $CONFIG['from'], $m)) {
    $fromDomain = rtrim($m[1], '>');
}
/* random_bytes() throws when the system has no entropy source. That is rare
   and it is also a fatal, which on this host means a bare 500 and a lost
   enquiry — the exact failure mode that hid the mail() problem for a day. A
   weaker id is worth far more than an unhandled throw. */
try {
    $messageIdSeed = bin2hex(random_bytes(8));
} catch (Throwable $e) {
    $messageIdSeed = substr(md5((string) mt_rand() . microtime()), 0, 16);
}
$messageId = '<' . date('YmdHis') . '.' . $messageIdSeed . '@' . $fromDomain . '>';

$headers = [
    'From: ' . $CONFIG['from'],
    'Reply-To: ' . $values['email'],
    'Message-ID: ' . $messageId,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    'X-Mailer: gathaithi-site',
];

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
/* NOT $body — that name already holds the decoded request further up. The
   closure that reads it captured it by value, so reassigning would not have
   broken anything today; it would have broken the first time somebody moved a
   line. */
$messageBody = implode("\n", $lines);

if ($CONFIG['smtp_pass'] === '') {
    $record('NO-SMTP-PASSWORD', 'create public_html/.mail-password.php');
    fail(502, 'The site is not yet able to send mail. Your message has been recorded — please call or WhatsApp us, or try again later.');
}

$sent = false;
$why = '';
try {
    $sent = smtp_send($CONFIG, $to, $encodedSubject, $messageBody, $headers, $why);
} catch (Throwable $e) {
    $sent = false;
    $why = get_class($e) . ': ' . $e->getMessage();
}

$record($sent ? 'SENT' : 'SMTP-FAILED', $why);

if (!$sent) {
    fail(502, 'We could not send that just now. Please try again, or call the office directly.');
}

ok();
