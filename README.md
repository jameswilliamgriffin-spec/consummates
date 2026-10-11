# The Consummates

Website for The Consummates, a live wedding and party band from the West Midlands.

Built with Vite, React 19 and TypeScript, with GSAP for motion and
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
| Logo | `src/brand/Logo.tsx` and `src/brand/wordmark.svg` |
| Sections | `src/components/` |
| Motion flags and in-page navigation | `src/lib/motion.ts` |
| Scroll film (expansion, text beats) | `src/components/ScrollFilm.tsx`; size/expansion styling in `src/index.css` |
| Images, video, film frames | `public/` |

Band member photos go in `public/img/band/` and are linked from `band.members` in `src/content.ts`;
members without a photo show a monogram placeholder.

## Deploy (Vercel)

Import the repo in Vercel. The framework (Vite), build command and output folder are set in
`vercel.json`, along with long-cache headers for hashed assets and media. No environment variables are needed.

The canonical URL, social image and structured data in `index.html` assume
`https://www.theconsummates.co.uk/`; update them if the domain changes.

## Motion and loading

The hero poster appears immediately; background video plays only while visible and can be paused.
The scroll film begins as a rounded box containing the original 200-frame sequence. It expands
over the first 28% of its scroll range as the frames move into the singer’s dress, then blends
into the GodRays and DotOrbit shader behind “See you on the dancefloor.” Frames are fetched
only as the section approaches; decoded frames outside the playhead window are released.
It never locks or advances the page automatically. The source frame-building script is
`scroll-film/build-frames.sh` in the parent project.
The email option is hidden until the mailbox is ready. Decorative shaders load on demand and unmount offscreen. Reduced motion uses static imagery and
fully visible, unpinned content. Reviews have a pause control and stop while keyboard focus is inside.
