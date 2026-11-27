# Putting this on cPanel

This folder is the whole site. There is no Node, no database and nothing to
install — it is HTML, CSS, JavaScript and images, plus one PHP file for the
two enquiry forms.

## 1. Upload

Upload **the contents of this folder** — not the folder itself — into
`public_html`. In cPanel's File Manager, zip it first and use *Extract*; the
site is several hundred files and a drag-and-drop of that many will stall.

Make sure `.htaccess` came across. File Manager hides dotfiles until you turn
on **Settings → Show Hidden Files**, and without it every URL 404s and every
image is served larger than it needs to be.

## 2. Create the mail password file

**This host disables PHP's `mail()`.** Confirmed on 2026-09-08 — loading
`/enquiry.php` in a browser reports `"mail":"DISABLED ON THIS HOST"`. That is
ordinary on shared hosting: it is how a provider stops one compromised account
spamming from the whole server. Calling it is a fatal error, which is why the
first live enquiry came back as a bare 500.

So the site sends the way a phone does — authenticated SMTP over TLS as
`website@gathaithi.cloud`, which is also the better route: the message is
signed by the domain's own server, which is what its DKIM and its strict DMARC
policy expect.

It needs one file. In File Manager, inside `public_html`, create
**`.mail-password.php`** containing the password for `website@gathaithi.cloud`.
Any of these work:

```php
<?php return 'the password';
```

```
the password
```

The file is read as TEXT, never executed, so a stray quote or a missing
semicolon cannot break anything. It used to be `require`d, which meant a typo
in it was a PHP parse error that took the whole endpoint down with a bare 500 —
including the diagnostic that would have explained why.

**It is a separate file on purpose.** `enquiry.php` gets re-uploaded whenever
the site is rebuilt, and a password kept inside it would be wiped every time.
This one is set once and survives. PHP files are executed rather than served,
so it is not readable over the web, and the leading dot keeps it out of
directory listings too.

The addresses themselves are already set in `enquiry.php` and need no editing:

```php
'sample_to'  => 'marketing@gathaithi.cloud',   // Our Coffee enquiries
'contact_to' => 'office@gathaithi.cloud',      // contact page enquiries
'from'       => 'Gathaithi website <website@gathaithi.cloud>',
```

## 2b. Check it before testing

Open **https://gathaithi.cloud/enquiry.php** in a browser. It answers:

```json
{"error":"Method not allowed.","handler":"…","transport":"smtp",
 "smtp_password_file":"present"}
```

`"smtp_password_file":"present"` means the file was found and read. If it says
`MISSING`, the file is not there or is not named exactly `.mail-password.php`.

## 3. Send yourself one of each

Submit the form on **Our Coffee**, and the one on **Contact**. Both should
land in the mailbox above.

If they do not, look at `.enquiry-store/enquiries.log` next to `enquiry.php`.
Every submission is written there whether or not the mail went out, marked
`SENT` or `MAIL-FAILED`, so an enquiry is never lost to a mail problem. That
folder denies web access through its own `.htaccess`; check that it does
before going live, by asking for `/.enquiry-store/enquiries.log` in a browser
and confirming you get a 403.

If a page shows PHP source or a blank white screen, the host is on an old PHP
version — set it to 8.0 or newer in cPanel → **MultiPHP Manager**. To check
the file itself, cPanel → Terminal, then `php -l enquiry.php`.

## What is in here

| path | what it is |
|---|---|
| `en/` | every page, as `index.html` in its own folder |
| `_next/` | the CSS and JavaScript, named by content hash |
| `_img/` | every photograph, pre-rendered at 7 widths in AVIF and WebP |
| `images/` | the original photographs; kept for OpenGraph and as a fallback |
| `enquiry.php` | the two forms |
| `.htaccess` | redirects, AVIF negotiation, caching, compression |

## Why it is fast

- **Nothing is generated per request.** Apache reads a file and sends it.
  There is no Node process to start, to run out of memory, or to restart under
  load; a traffic spike is limited by the disk, not by an app server.
- **Images are already the right size.** Each photograph exists at seven
  widths, and `.htaccess` upgrades a `.webp` request to the `.avif` sibling
  when the browser says it reads AVIF. No resizing happens on the host.
- **Assets are cached for a year**, because their names change when their
  contents do. HTML is deliberately *not* cached, so a re-upload is live
  immediately rather than after every visitor clears their browser.

## Re-deploying

Run `npm run build:cpanel` again and upload the new `dist-cpanel`. Delete the
old `_next` folder first — its filenames are content-hashed, so old builds
leave orphans that accumulate. `en/`, `_img/` and `images/` can be overwritten
in place. **Do not overwrite `enquiry.php`** unless you are ready to put the
email addresses back.
