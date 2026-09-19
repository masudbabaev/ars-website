# Azerbaijan Research Society website

A responsive bilingual (Azerbaijani/English) website for the Azerbaijan Research Society. The primary public address is:

`https://azresearchsociety.org/`

The domain is connected through GitHub Pages, with `https://masudbabaev.github.io/ars-website/` retained as the underlying project address.

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

The website includes the society's mission, community model, research departments, three-week Early Researcher Workshop, and interactive bilingual profiles for all Executive Board members. Masud Babayev's profile also includes verified APA-style publication records and DOI links.

## GitHub Pages deployment

1. Upload the contents of this folder directly to the root of `masudbabaev/ars-website`.
2. Do not upload the ZIP file and do not create another nested `ars-website` folder.
3. In **Settings → Pages**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)`, then click **Save**.
5. Wait for the Pages deployment to finish, then open `https://azresearchsociety.org/`.

The metadata, `CNAME`, `robots.txt`, and `sitemap.xml` are configured for `azresearchsociety.org`.

## Connecting the custom domain later

The site is prepared for `azresearchsociety.org`. To connect it:

1. Open **Settings → Pages** and enter the domain under **Custom domain**.
2. Follow GitHub's displayed DNS instructions at the domain registrar.
3. Confirm that the repository root contains a `CNAME` file with `azresearchsociety.org`.
4. At the DNS provider, point the apex domain to GitHub Pages and point `www` to `masudbabaev.github.io`.
5. Enable **Enforce HTTPS** after the certificate becomes available.

Before public launch, connect the membership button to the final application form if email applications will not be used.
