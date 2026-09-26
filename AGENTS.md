# Codex instructions — Henri Löhlein portfolio

## Source of truth
- This directory is the website and Git repository root. The site uses static HTML, CSS and JavaScript without a build step or framework.
- Start with `docs/PROJEKT-STATUS.md`. Read `CLAUDE.md` before changes. For visual or CSS work, consult only the relevant sections of `docs/REFERENZEN.md`.
- `index.html`, `css/styles.css` and `js/main.js` are the live site and current working basis. `preview-neu.html` with its own CSS and JavaScript is a parked redesign experiment; do not treat its former to-dos as active.
- Inspect the files for the requested surface. Read `docs/KOMPONENTEN-ARCHIV.md` only when a removed component or its history matters.

## Careful changes
- Inspect Git status and compare the remote before substantial work on either device. Pull when needed after accounting for local changes. Preserve existing work; commit and push only when Henri asks to sync or publish.
- Make the smallest coherent change that fulfils the request. Choose one relevant primary skill for a design task and add another only for a distinct need. Skills can be selected automatically; Henri does not have to invoke them on every task. Follow the project's static stack and existing visual direction over generic skill defaults.
- `.agents/` and `.claude/` are ignored by Git and remain device-local. `skills-lock.json` records sources but does not activate skills by itself. `make-interfaces-feel-better` is not in that lock; if its Codex copy is missing but `.claude/skills/make-interfaces-feel-better/SKILL.md` exists, copy that file to `.agents/skills/make-interfaces-feel-better/SKILL.md` before using it.
- Keep German and English copy in sync. Live `data-i18n` strings use the `EN` dictionary in `js/main.js`. The redesign preview has shared `data-i18n` strings in `js/preview-neu-main.js` and new `data-i18n-p` strings in `js/preview-neu.js`.
- Preserve privacy. Never track CV PDFs, the raw `Bilder/` folder, environment files or other private source material. `AGENTS.md`, `CLAUDE.md`, `README.md` and `docs/` are intended to be tracked.
- Do not publish or change hosting without Henri's explicit request. A push to `main` publishes the tracked preview file on GitHub Pages too; its `noindex` tag does not make it private.
- Start a static preview from this directory on an available port and open `/index.html` by default. Open `/preview-neu.html` only when Henri explicitly requests the experiment. For visual changes, inspect relevant desktop and mobile widths when browser preview is available.

## Keep guidance current
- Document the actual live and preview structures. Old component notes do not imply a component should be restored; verify markup and scripts first.
- Keep handoff notes in `docs/PROJEKT-STATUS.md` focused on the current state and next steps.
