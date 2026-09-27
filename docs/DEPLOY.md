# Deployment — GitHub + GitHub Pages

Diese Seite ist **statisch** (kein Build). Sie liegt im öffentlichen Repo und wird über
**GitHub Pages** ausgeliefert. Jeder Push auf `main` deployt automatisch neu.

## Setup (bereits eingerichtet)

- **GitHub-User:** `henriloehlein`
- **Repo:** `portfolio` (public)
- **Remote:** `https://github.com/henriloehlein/portfolio.git`
- **Branch:** `main`
- **Live-URL:** <https://henriloehlein.github.io/portfolio/>
- **Tooling:** Henri nutzt auch **GitHub Desktop** (keine Kommandozeile nötig).

## Update-Kreislauf (kein erneutes „Publishen")

> Dateien ändern → **Commit** → **Push origin main** → GitHub Pages baut automatisch neu (~1 Min).

Mit GitHub Desktop:

1. Änderungen sichten, Commit-Nachricht schreiben, **Commit to main**.
2. **Push origin**.
3. Nach ~1 Minute ist die Seite aktualisiert.

Auf der Kommandozeile in der Repo-Wurzel zuerst `git status --short` prüfen, dann nur die
gewünschten Pfade mit `git add -- DATEI` aufnehmen und mit `git diff --cached` kontrollieren.
Anschließend committen und `git push origin main` ausführen.

## Cache: Versionsnummer bei CSS/JS erhöhen

GitHub Pages lässt Dateien etwa 10 Minuten im Browser zwischenspeichern. Ändern sich
`index.html` und `js/main.js` gemeinsam, kann ein Browser neues HTML mit altem Skript
kombinieren; dann funktionieren z. B. die Case Studies nicht. Deshalb tragen die Verweise in
`index.html` eine Versionsnummer (`css/styles.css?v=…`, `js/main.js?v=…`). Bei jeder
Änderung an CSS oder JS das Datum dort auf den aktuellen Tag setzen.

## Was NICHT veröffentlicht wird

In `.gitignore` ausgeschlossen (bleibt lokal, landet nicht auf der öffentlichen Seite):

- `Lebenslauf_*.pdf` — enthält Telefonnummer und Geburtsdatum (Datenschutz).
- `Bilder/` — Henris Quell-Ablage mit Originalen. Die Website nutzt die sauberen Kopien in
  `assets/img/covers/` (diese sind committet).

## Bekannte Eigenheiten

- **Cache nach Deploy:** Der Browser zeigt teils kurz die alte Version. Fix: hart neu laden oder
  URL mit `?v=2` aufrufen.
- `.nojekyll` liegt im Repo und schaltet die Jekyll-Verarbeitung auf GitHub Pages ab.

## Eigene Domain und Hetzner (später)

GitHub Pages bleibt während der Iteration der Host. Für die spätere Veröffentlichung über eine
eigene URL bei Hetzner werden Hosting, DNS und HTTPS separat eingerichtet. Dann müssen auch
`canonical`, `og:url` und `og:image` in der aktiven Seite auf die tatsächlich genutzte Domain zeigen.
