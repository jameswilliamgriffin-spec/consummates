# The Consummates

Website for The Consummates, a live wedding and party band from the West Midlands.

Built with Vite, React 19 and TypeScript, with GSAP + Lenis for motion and
`@paper-design/shaders-react` for the WebGL backgrounds.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build on http://localhost:4173
npm run lint
```

## Where things live

| What | Where |
| --- | --- |
| All copy (sections, band, setlist, packages, FAQ, contact details) | `src/content.ts` |
| Logo (placeholder, swap in one place) | `src/brand/Logo.tsx` |
| Sections | `src/components/` |
| Shared scroll animations (`data-split`, `data-fade`, …) | `src/lib/animations.ts` |
| Smooth scroll + motion helpers | `src/lib/motion.ts` |
| Scroll film settings (speed, text beats) | `FILM_CONFIG` in `src/components/ScrollFilm.tsx` |
| Images, video, film frames | `public/` |

Band member photos go in `public/img/band/` and are linked from `band.members` in `src/content.ts`;
members without a photo show a monogram placeholder.

## Deploy (Vercel)

Import the repo in Vercel. The framework (Vite), build command and output folder are set in
`vercel.json`, along with long-cache headers for hashed assets and media. No environment variables are needed.

The canonical URL, social image and structured data in `index.html` assume
`https://www.theconsummates.co.uk/`; update them if the domain changes.
