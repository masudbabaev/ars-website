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

- `index.html` — bilingual landing page
- `programs.html` — interactive four-stage research pathway
- `about.html`, `workshop.html`, `departments.html`, and `contact.html` — dedicated content pages
- `people.html` — People hub with separate board choices
- `executive-board.html` and `scientific-board.html` — dedicated board directories and interactive profiles
- `styles.css` — responsive ARS visual system
- `script.js` — branded page transitions, language switcher, accessible program tabs, mobile navigation, profiles, forms, and reveal effects
- `assets/` — ARS logo, optimized board portraits, and department visualizations

The website uses a professional multi-page structure while preserving the ARS visual identity. It includes a short 0–100% ARS logo-fill transition on first entry and between internal pages, with a reduced-motion fallback. It also includes the society's mission, a four-stage interactive research pathway, illustrated research departments, the three-week Early Researcher Workshop, and a People hub with separate Executive Board and Scientific Advisory Board pages. Both board pages use interactive hierarchical visualizations; Amil Aligayev is identified as Head of the Scientific Advisory Board. All thirteen people have interactive bilingual profiles, compact primary-affiliation marks, and academic or professional links where supplied. The site also includes a bilingual contact form connected to Formspree; membership and workshop calls to action preselect the relevant enquiry topic. The public contact address is `info@azresearchsociety.org`. Selected publications include DOI links.

## Contact form

The form posts to Formspree form ID `xljdgezl`. JavaScript enhances the submission with inline bilingual status messages; the normal HTML `action` and `method` remain in place as a no-JavaScript fallback. Configure recipient notifications, allowed domains, and spam protection in the Formspree dashboard.

## GitHub Pages deployment

1. Upload the contents of this folder directly to the root of `masudbabaev/ars-website`.
2. Do not upload the ZIP file and do not create another nested `ars-website` folder.
3. In **Settings → Pages**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)`, then click **Save**.
5. Wait for the Pages deployment to finish, then open `https://azresearchsociety.org/`.

The metadata, `CNAME`, `robots.txt`, and `sitemap.xml` are configured for `azresearchsociety.org`.

## Repository hygiene

- Keep the production files listed above directly in the repository root.
- Do not commit ZIP delivery archives.
- Do not keep another nested `ars-website/` copy inside the repository.
- Use only `assets/ars-logo.png`; a second root-level `ars-logo.png` is unnecessary.

The custom domain is already connected through GitHub Pages. Keep `CNAME`, the four GitHub Pages apex A records, the `www` CNAME, and **Enforce HTTPS** enabled.
