# MEDIva Healthcare Solutions — Website

A production-ready static website (HTML / CSS / vanilla JavaScript) for MEDIva
Healthcare Solutions — medical tourism, NRI elder care, and Ayurveda wellness
across India. No build step, no framework, no dependencies. Deploys to Vercel
(or any static host) as-is.

## Folder structure

```
site/
├── index.html              Homepage (hero, services, interactive body map, etc.)
├── medical-tourism.html    Medical tourism overview
├── services.html           All-services hub
├── nri-care.html           NRI elder-care packages
├── wellness.html           Ayurveda & wellness retreats
├── patient-journey.html    6-step journey + patient story
├── cost.html               Cost / transparent free-quote page
├── professionals.html      Partnership pathways
├── about.html              Mission, vision, values
├── contact.html            Contact channels + form
├── body-part.html          Dynamic detail page — reads ?part=<id> (heart, knee, brain…)
├── vercel.json             Clean URLs + asset caching
└── assets/
    ├── css/styles.css      Full design system (one stylesheet, all pages)
    ├── js/main.js          Shared header/footer/chat/booking + body map + page logic
    └── img/                logo.svg, favicon.svg
```

## How it works

- **Shared navigation & footer** are injected by `assets/js/main.js` into the
  `<header id="site-header">` and `<footer id="site-footer">` placeholders on
  every page — edit the `NAV` array / `buildFooter()` once and all pages update.
- **Interactive body map** (homepage `#bodymap`) is built from the `HOTSPOTS`
  and `PARTS` data in `main.js`. Each region links to
  `body-part.html?part=<id>`, which renders its conditions, risks of delay, and
  treatment options from the same `PARTS` data.
- **WhatsApp chat widget** and **booking modal** (with date/time slots) are part
  of the shared chrome on every page.
- **Forms & bookings** open a pre-filled email to `csant2612@gmail.com` and offer
  a pre-filled WhatsApp message to `+91 90084 45189`. Booked slots are remembered
  in the browser via `localStorage`.

## Editing the essentials

Open `assets/js/main.js` and edit the `CONTACT` object at the top to change the
email, WhatsApp number, or phone site-wide. All copy, treatments, and body-part
content also live in `main.js` (`PARTS`, `JOURNEY`) and in each page's HTML.

## Photography

Section/hero images are served from the Unsplash CDN (royalty-free, optimised
URLs) so the repository stays lightweight. To self-host instead, download the
images into `assets/img/` and replace the `images.unsplash.com/...` URLs in the
HTML and in `main.js` (the `FIGURE_SVG` is local; hero/section URLs are inline).

## Connecting real form submissions (optional)

The forms currently use `mailto:` so leads arrive in your inbox the moment the
visitor sends. To capture submissions automatically without the user pressing
send, point the form handlers in `main.js` at a form backend (e.g. Formspree,
Web3Forms, or a Vercel serverless function) — the field names are already set up
(`name`, `email`, `phone`, `country`, `service`, `contact`, `message`).

## Deploy to Vercel

1. Push this `site/` folder to a Git repo (or use the Vercel CLI).
2. In Vercel: **New Project → Import** the repo.
3. Framework preset: **Other**. Build command: *(none)*. Output directory: `/`
   (or set the root to this `site/` folder).
4. Deploy. `vercel.json` enables clean URLs (e.g. `/about` → `about.html`) and
   long-term caching for `/assets`.

Or with the CLI:

```bash
npm i -g vercel
cd site
vercel
```
