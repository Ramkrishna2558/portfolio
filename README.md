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

