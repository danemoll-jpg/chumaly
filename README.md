# Chumaly Maltese & Yorkies website

A phone-first rebuild of chumaly.com (originally on Weebly). It keeps the same pink look, text, photos, and page addresses, so existing Google links keep working.

## Preview it on your computer

1. Double-click **`Preview Site.bat`** (needs [Node.js](https://nodejs.org), which is already installed on this PC).
2. Your browser opens **http://localhost:8080**.
3. **On your phone:** connect to the same Wi-Fi and open the "Phone" address printed in the black window labeled **Ethernet** (`http://10.0.0.224:8080`). The Wi-Fi address is blocked because Windows treats that Wi-Fi network as Public.

Or from a terminal:

```bash
node server.js
```

While testing locally, form submissions are **not** emailed. They're printed in the black server window so you can check them.

## Where things live

Everything that goes on the internet is in the **`site/`** folder. The files next to it (`server.js`, `Preview Site.bat`, this README) are only for testing.

| What | File |
|---|---|
| Colors, fonts, spacing | `site/css/style.css` (color settings at the top) |
| Hamburger photo menu, phone/email, footer | `site/js/site.js` (`MENU` and `CONTACT` at the top) |
| Page text | each `site/*.html` page |
| Photos | `site/images/` (full size) and `site/images/thumbs/` (small versions for grids) |

### Adding a new puppy
In `site/maltese-puppies.html`, copy one `<article class="card">…</article>` block, then change the name, text, and photo file names. Put the photo in `site/images/`, plus a copy of it (about 600px wide) in `site/images/thumbs/`.

## Going live (after testing)

Recommended: **Netlify** (free for a site this size).
- The site deploys automatically from GitHub (`danemoll-jpg/chumaly`). Every push to `main` updates the live site. `netlify.toml` tells Netlify to publish only the `site/` folder.
- The Contact and Health Guarantee forms use **Netlify Forms**. In the project, open *Forms*, click **Enable form detection**, then click **Trigger deploy** on the *Deploys* tab so Netlify finds the forms. Then add an email notification to chumaly@gmail.com under *Project configuration → Notifications → Emails and webhooks*.
- **Domain:** chumaly.com already exists. In Netlify, go to *Domain management → Add domain* and enter `chumaly.com`, then change the domain's DNS at its current registrar (Domain.com / iPage, in her account) to the records Netlify shows. Keep the old site running until the new one is live.
- The Google Reviews slider (Elfsight) didn't load during local testing; it's likely limited to the real domain. If it still doesn't appear after going live, check the allowed domains in the Elfsight dashboard.
