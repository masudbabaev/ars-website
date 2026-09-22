# Azerbaijan Research Society website

A responsive bilingual (Azerbaijani/English) website for the Azerbaijan Research Society. The primary public address is:

`https://azresearchsociety.org/`

The domain is deployed on Netlify from the `masudbabaev/ars-website` GitHub repository. Netlify automatically publishes changes pushed to the `main` branch.

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
- `script.js` — branded page transitions, dynamic hero network, scroll feedback, language switcher, accessible program tabs, mobile navigation, profiles, forms, and reveal effects
- `_headers` — Netlify security and caching policy
- `404.html` — bilingual recovery page for broken or outdated links
- `assets/` — ARS logo, optimized board portraits, and department visualizations

The website uses a professional multi-page structure while preserving the ARS visual identity. It includes a short 0–100% ARS logo-fill transition on first entry and between internal pages, with a reduced-motion fallback. Version 28 introduces a prominent living-logo hero: the authentic ARS mark sits inside a pointer-responsive research network with animated identity rings, discipline nodes, light sweeps, depth, and live network status. The manifesto is now a separate interactive identity strip. A desktop chapter rail, dimensional card tilt, stronger page arrival, live page progress, animated statistics, contextual lighting, a compact scrolling header, smoother profile dialogs, program-stage progress, and a bilingual 404 page complete the motion system. It also includes the society's mission, a four-stage interactive research pathway, illustrated research departments, the three-week Early Researcher Workshop, and a People hub with separate Executive Board and Scientific Advisory Board pages. Both board pages use interactive hierarchical visualizations; Amil Aligayev is identified as Head of the Scientific Advisory Board. All thirteen people have interactive bilingual profiles, compact primary-affiliation marks, and academic or professional links where supplied. The site also includes a bilingual contact form connected to Formspree; membership and workshop calls to action preselect the relevant enquiry topic. The public contact address is `info@azresearchsociety.org`. Selected publications include DOI links.

## Contact form

The form posts to Formspree form ID `xljdgezl`. JavaScript enhances the submission with inline bilingual status messages; the normal HTML `action` and `method` remain in place as a no-JavaScript fallback. Configure recipient notifications, allowed domains, and spam protection in the Formspree dashboard.

## Netlify deployment

1. Upload the contents of this folder directly to the root of `masudbabaev/ars-website`.
2. Do not upload the ZIP file and do not create another nested `ars-website` folder.
3. Commit and push the files to the `main` branch.
4. Netlify will automatically build and publish the updated static site.
5. Confirm that the production deploy is published, then open `https://azresearchsociety.org/`.

The metadata, DNS, `robots.txt`, and `sitemap.xml` are configured for `azresearchsociety.org`. The legacy `CNAME` file is harmless on Netlify and is kept only for repository portability.

Do not disconnect the GitHub repository from Netlify: the repository is the source of the automatic Netlify deployment. GitHub Pages itself can remain disabled.

## Repository hygiene

- Keep the production files listed above directly in the repository root.
- Do not commit ZIP delivery archives.
- Do not keep another nested `ars-website/` copy inside the repository.
- Use only `assets/ars-logo.png`; a second root-level `ars-logo.png` is unnecessary.

The custom domain is connected to Netlify. Keep the Porkbun DNS records pointed to Netlify and let Netlify manage the TLS certificate. HSTS is intentionally not enabled in this package until HTTPS has remained stable in production.
