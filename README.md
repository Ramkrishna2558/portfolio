# Ramkrishna More — Portfolio

A responsive full-stack engineering portfolio built with Svelte, Vite, Three.js and Atropos. It presents selected work, a career journey and contact links, with native scrolling and progressively enhanced motion.

## Run locally

```sh
npm ci
npm run dev
```

On Windows, use `npm.cmd` if PowerShell blocks npm scripts. Run `npm run check` and `npm run build` before publishing; `npm run preview` serves the production build locally.

## Project structure

- `src/components/` — page sections and reusable Svelte components.
- `src/lib/` — portfolio data, motion, scroll transitions and the Three.js scene.
- `src/styles/` — layout, motion and depth styles.
- `public/` — portrait, résumé, cursor, favicon and icon license.
- `.github/workflows/pages.yml` — GitHub Pages build and deployment.

Edit `src/lib/data.js` for profile details and featured project content. The page and career story are in `src/components/Portfolio.svelte`. Update `public/Ramkrishna-More-Resume.pdf` when the résumé changes. The cursor is adapted from Tabler Icons under MIT; see `public/licenses/tabler-icons.txt`.

## GitHub Pages

Push this project to a GitHub repository with `main` as its default branch, then choose **Settings → Pages → Build and deployment → GitHub Actions**. The workflow checks, builds and publishes the site on each push to `main`. Vite uses a relative base so the build works both at a domain root and under a repository path. The resulting URL appears in the workflow's deploy job and repository Pages settings.

The 3D scene loads as a separate chunk near the viewport and pauses offscreen. Native scrolling is retained. Decorative motion honors the device's reduced-motion setting. Vibration is browser- and device-dependent, requires prior user interaction, and browsers do not expose hardware intensity controls.

## Display modes

The bottom-left controls switch between light/dark themes and Reader mode. Preferences persist locally. Reader mode increases text size, simplifies layouts and disables decorative motion. The toolkit presents current engineering skills separately from the forward-deployed and applied-AI direction.


Haptic feedback uses short, rate-limited pulses on confirmed clicks, holds and settled section changes. Touch scrolling does not trigger press vibrations. Unsupported hardware is silent. Run `node --test tests/*.test.js` to check activation, repeat suppression and cancellation. Physical motor response must be assessed on a supported device. Dark mode uses a white outlined cursor and themed hover/focus surfaces.

## Personal hub

`src/components/PersonalHub.svelte` contains the Beyond the build section, with social links, a photo/bio, an optional Spotify player and a Buy Me a Coffee link. Links and the music selection were reviewed against own.page/ram; the layout is original. The Spotify iframe loads only after the visitor requests it, and the external Spotify link remains available. Update social handles and the album ID in this component.

## Evidence and editorial structure

The hero leads directly to selected work. The decorative 3D interlude follows the projects and loads near the viewport. `src/styles/editorial.css` contains the reading and interaction refinements.

MTSE's case study links to inspected API, validation and routing source. Its overview and storefront currently disagree on framework; the case study explicitly limits its claims to the shared library. R�sum� metrics are labeled as self-reported, without published baseline or coverage artifacts. Automart uses a delivery-scope diagram, not a reconstructed screenshot. Add original client-approved screenshots and measurement artifacts when available.

Interactive cards fade into view without translating their hit targets. Headings settle before reading, and project/career content does not fade away while being read. Reader mode and reduced motion remain supported.
