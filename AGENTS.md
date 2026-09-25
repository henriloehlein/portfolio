# Codex instructions — Henri Löhlein portfolio

## Source of truth
- This directory is the website and Git repository root. The site uses static HTML, CSS and JavaScript without a build step or framework.
- Start with `docs/PROJEKT-STATUS.md`. Read `CLAUDE.md` before changes, and consult `docs/REFERENZEN.md` for visual or CSS work.
- `index.html`, `css/styles.css` and `js/main.js` are the live site. The current redesign is `preview-neu.html` with its own CSS and JavaScript. Keep live files unchanged until Henri approves moving the preview into them.

## Careful changes
- Inspect Git status and pull before starting work on either device. Preserve existing changes. After authorized work, commit and push so the other device receives it.
- Make the smallest coherent change that fulfils the request. Use skills selectively; follow the project's static stack and existing visual direction over generic skill defaults.
- Keep German and English copy in sync. Live strings use `data-i18n` and the `EN` dictionary in `js/main.js`; preview strings use `data-i18n-p` and `js/preview-neu.js`.
- Preserve privacy. Never track CV PDFs, the raw `Bilder/` folder, environment files or other private source material. `AGENTS.md`, `CLAUDE.md`, `README.md` and `docs/` are intended to be tracked.
- Do not commit, push, publish or change hosting without Henri's explicit request. GitHub Pages is the current host.
- Start a static preview from this directory on an available port. For visual changes, inspect relevant desktop and mobile widths when browser preview is available.

## Keep guidance current
- Document the actual live and preview structures. Old component notes do not imply a component should be restored; verify markup and scripts first.
- Keep handoff notes in `docs/PROJEKT-STATUS.md` focused on the current state and next steps.
