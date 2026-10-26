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

The quote form posts to the first-party Cloudflare Pages Function at
`/api/inquiry`. It sends the product, source page URL, customer details,
quantity, destination, target timeline, and requirements. Configure
`GOOGLE_SHEETS_WEBHOOK_URL` in Pages so confirmed submissions reach the lead
register. Configure the three `RESEND`/`INQUIRY_*` variables as a backup when
the Sheets webhook is unavailable. If both delivery channels are unavailable,
the browser opens a `mailto:` draft instead of reporting a false success.
