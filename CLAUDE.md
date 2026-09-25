# CLAUDE.md — Portfolio (Henri Löhlein)

Statisches UX/UI-Portfolio mit HTML, CSS und JavaScript, ohne Build-Schritt oder Framework. Die frühere Planung mit Next.js, Tailwind, Framer Motion und Vercel wurde nicht umgesetzt.

## Einstieg und Dateien
- `docs/PROJEKT-STATUS.md` ist der aktuelle Einstiegspunkt für beide Geräte. Dort stehen Live-Stand, Preview, offene Arbeit und dauerhaft gültige Textregeln.
- `index.html`, `css/styles.css` und `js/main.js` bilden die Live-Seite auf GitHub Pages.
- Das Redesign liegt in `preview-neu.html`, `css/preview-neu-base.css`, `css/preview-neu.css`, `js/preview-neu-main.js` und `js/preview-neu.js`. Es wird erst nach Henris Freigabe in die Live-Dateien übertragen.
- Deployment-Details stehen in `docs/DEPLOY.md`, visuelle Referenzen in `docs/REFERENZEN.md`, die Vorgeschichte entfernter Komponenten in `docs/KOMPONENTEN-ARCHIV.md`.
- `css/liquid-glass.css` enthält optionale Glas-Bausteine und ist nicht in `styles.css` eingebunden.

## Arbeitsweise
- Vor dem Arbeiten `git pull`; nach autorisierten Änderungen committen und pushen, damit beide Geräte denselben Stand haben.
- Für lokale Vorschauen einen statischen Server aus der Repo-Wurzel auf einem verfügbaren Port starten. Die aktuelle Arbeit unter `/preview-neu.html` öffnen.
- Bei Änderungen an deutschen `data-i18n`-Texten die englischen Einträge in `js/main.js` synchron halten. In der Preview gehören englische `data-i18n-p`-Texte in `js/preview-neu.js`.
- Die Textregeln und die Trennung von Live-Seite und Preview stehen in `docs/PROJEKT-STATUS.md`.

## Datenschutz
- CV-PDFs und `Bilder/` enthalten private Rohdaten und bleiben durch `.gitignore` ausgeschlossen. Nur bereinigte Web-Assets in `assets/img/` gehören ins Repo.
- `README.md` ist bewusst kurz und neutral. Projekt- und Arbeitsnotizen liegen in `docs/`.
