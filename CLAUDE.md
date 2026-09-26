# CLAUDE.md — Portfolio (Henri Löhlein)

Statisches UX/UI-Portfolio mit HTML, CSS und JavaScript, ohne Build-Schritt oder Framework. Die frühere Planung mit Next.js, Tailwind, Framer Motion und Vercel wurde nicht umgesetzt.

## Einstieg und Dateien
- `docs/PROJEKT-STATUS.md` ist der aktuelle Einstiegspunkt für beide Geräte. Dort stehen Live-Stand, Preview, offene Arbeit und dauerhaft gültige Textregeln.
- `index.html`, `css/styles.css` und `js/main.js` bilden die Live-Seite auf GitHub Pages.
- `preview-neu.html`, `css/preview-neu-base.css`, `css/preview-neu.css`, `js/preview-neu-main.js` und `js/preview-neu.js` enthalten einen zurückgestellten Redesign-Entwurf. Aktuelle Arbeitsbasis ist die Live-Seite.
- Deployment-Details stehen in `docs/DEPLOY.md`, visuelle Referenzen in `docs/REFERENZEN.md`, die Vorgeschichte entfernter Komponenten in `docs/KOMPONENTEN-ARCHIV.md`.
- `css/liquid-glass.css` enthält optionale Glas-Bausteine und ist nicht in `styles.css` eingebunden.
- Aktuelle Übergabe: Die ausgewählte forwerts-Variante C ist in `index.html` übernommen. Projektprofile, horizontale Screenfolgen und die Auswahl aus Henris Kundenprojekten sind der aktuelle Stand. Details und inhaltliche Grenzen stehen in `docs/PROJEKT-STATUS.md`.

## Arbeitsweise
- Vor größeren Änderungen Git-Status und Remote-Stand prüfen; nur nach Sichtung lokaler Änderungen pullen. Commit und Push erfolgen, wenn Henri die Synchronisierung oder Veröffentlichung beauftragt. Ein Push auf `main` veröffentlicht die getrackte Preview-Datei ebenfalls auf GitHub Pages.
- Skills passend zur Aufgabe auswählen. Die lokalen Skills stehen für Codex unter `.agents/skills/` und für Claude Code unter `.claude/skills/`; nicht pauschal mehrere ähnliche Design-Skills laden.
- Für lokale Vorschauen einen statischen Server aus der Repo-Wurzel auf einem verfügbaren Port starten. Standardmäßig `/index.html` öffnen; `/preview-neu.html` nur auf ausdrücklichen Wunsch.
- Bei Änderungen an deutschen `data-i18n`-Texten die englischen Einträge in der zugehörigen JS-Datei synchron halten: live in `js/main.js`, Preview in `js/preview-neu-main.js`. Die zusätzlichen `data-i18n-p`-Texte der Preview stehen in `js/preview-neu.js`.
- Die Textregeln und die Trennung von Live-Seite und Preview stehen in `docs/PROJEKT-STATUS.md`.

## Datenschutz
- CV-PDFs und `Bilder/` enthalten private Rohdaten und bleiben durch `.gitignore` ausgeschlossen. Nur bereinigte Web-Assets in `assets/img/` gehören ins Repo.
- `README.md` ist bewusst kurz und neutral. Projekt- und Arbeitsnotizen liegen in `docs/`.
