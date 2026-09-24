# Cloudflare Pages deployment

This is an Astro static site. The build output is `dist`.

## Cloudflare Pages settings

- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `24`

The Git repository includes the generated `public/assets` directory and
`src/data/catalog.json`, so Cloudflare can build the site without the local
`../webp` source folder. Use `npm run build` for Git-connected deployments.
`npm run build:site` remains useful only when refreshing the catalog locally
from that source folder.

## Local preview

```text
npm run build:site
npm run preview
```

The site is fully static. Cloudflare Pages can serve it without a server or database.

## Contact form configuration

The quote form supports a real JSON-compatible form endpoint through the
`PUBLIC_FORM_ENDPOINT` build variable. Set it in Cloudflare Pages before
building, for example to a Formspree or Pages Function endpoint. The form
sends the product, source page URL, customer details, and requirements as a
POST request. When the variable is not set, the site keeps a visible `mailto:`
fallback so a visitor can still prepare an email draft.
