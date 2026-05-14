# AdMark Studio — Website

Static HTML/CSS/JS site for AdMark Studio. No build step, no framework — drop on any host.

## Files

```
admark-site/
├── index.html      Main page
├── styles.css      All styling (CSS variables, layout, animations)
├── script.js       Cursor, reveals, magnetic buttons, counters, form
└── README.md       This file
```

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
cd admark-site
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy

### GitHub Pages (free)

```bash
cd admark-site
git init
git add .
git commit -m "Initial commit — AdMark Studio site"
git branch -M main
git remote add origin https://github.com/<your-username>/admark-studio.git
git push -u origin main
```

Then in the repo on github.com → **Settings → Pages** → set source to `main / root`.
Site goes live at `https://<your-username>.github.io/admark-studio/`.

### Vercel

```bash
npm i -g vercel
cd admark-site
vercel
```

Vercel auto-detects static sites — accept the defaults.

### Netlify

Drag the `admark-site` folder onto <https://app.netlify.com/drop>.

## Customise

- **Brand name, copy, contact details** — edit directly in `index.html`.
- **Colour palette** — change the CSS variables at the top of `styles.css` (`--blue`, `--saffron`, `--ink`, `--bg`).
- **Typography** — swap the Google Fonts `<link>` in `index.html` and the `--serif` / `--sans` / `--mono` vars in `styles.css`.
- **Cases** — the four work cards are inline SVGs inside `<section id="work">`. Replace with your own SVG / `<img>` once you have real photography.
- **Form** — currently a frontend-only demo (shows a success state, doesn't send). Connect to Formspree, Getform, or your backend in `script.js` (`form.addEventListener('submit', …)`).

## What's in here

- Intro curtain reveal
- Custom magnetic cursor (with `VIEW` state on case cards)
- Word-by-word headline reveal
- Animated gradient mesh with mouse parallax
- Marquee strip
- Scroll-triggered reveals
- Animated number counters
- Hover-flip service cards
- Animated SVG case art (rotating orbits, soft floats)
- Mobile menu
- Frontend-only contact form with success state
