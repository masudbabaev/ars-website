# Azerbaijan Research Society website

A responsive bilingual (Azerbaijani/English) landing page based on the ARS visual identity, prepared for `azresearchsociety.org`.

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

## GitHub Pages deployment

1. Create a repository and add the contents of this folder at its root.
2. In **Settings → Pages**, choose **Deploy from a branch**, then select the main branch and root folder.
3. Add `azresearchsociety.org` under **Custom domain** before changing DNS records.
4. Configure the domain's DNS using the values shown by GitHub Pages.
5. Enable **Enforce HTTPS** after GitHub finishes issuing the certificate.

The included `CNAME`, `robots.txt`, and `sitemap.xml` files are already configured for the selected domain.

Before public launch, connect the membership button to the final application form if email applications will not be used.
