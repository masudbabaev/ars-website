# Azerbaijan Research Society website

A responsive bilingual (Azerbaijani/English) website for the Azerbaijan Research Society. The temporary public address is:

`https://masudbabaev.github.io/ars-website/`

The planned custom domain is `azresearchsociety.org`, but it should only be connected after the domain is purchased.

## Preview locally

Run a static web server in this folder, for example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Files

- `index.html` — page structure and bilingual content
- `styles.css` — responsive ARS visual system
- `script.js` — language switcher, mobile navigation, and reveal effects
- `assets/` — ARS logo, board portraits, and source template

The website includes the society's mission, programs, executive board, community call-to-action, and a three-week Early Researcher Workshop.

## GitHub Pages deployment

1. Upload the contents of this folder directly to the root of `masudbabaev/ars-website`.
2. Do not upload the ZIP file and do not create another nested `ars-website` folder.
3. In **Settings → Pages**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)`, then click **Save**.
5. Wait a few minutes and open `https://masudbabaev.github.io/ars-website/`.

The current metadata, `robots.txt`, and `sitemap.xml` are configured for the temporary GitHub Pages address. There is intentionally no `CNAME` file yet.

## Connecting the custom domain later

After purchasing `azresearchsociety.org`:

1. Open **Settings → Pages** and enter the domain under **Custom domain**.
2. Follow GitHub's displayed DNS instructions at the domain registrar.
3. Confirm that GitHub creates a `CNAME` file containing `azresearchsociety.org`.
4. Replace the temporary GitHub Pages URLs in `index.html`, `robots.txt`, and `sitemap.xml` with `https://azresearchsociety.org/`.
5. Enable **Enforce HTTPS** after the certificate becomes available.

Before public launch, connect the membership button to the final application form if email applications will not be used.
