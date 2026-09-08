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

## 2. Set the two email addresses

Open `enquiry.php` and edit the block at the top:

```php
'sample_to'  => 'marketing@gathaithi.cloud',   // Our Coffee enquiries
'contact_to' => 'office@gathaithi.cloud',      // contact page enquiries
'from'       => 'Gathaithi website <website@gathaithi.cloud>',
```

**These three already exist** — `office@`, `marketing@` and `website@` were
created in cPanel on 2026-09-08 — so this block should need no editing unless
the addresses change.

**`from` must stay on gathaithi.cloud.** The domain publishes DMARC
`p=quarantine` with `aspf=s` (strict alignment), so a `From:` of gmail.com, or
of any other domain, is not bounced — it is **silently filed as spam**. The
form looks broken while working perfectly. SPF, DKIM and DMARC are all already
published for this domain by the host; nothing needs adding.

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
