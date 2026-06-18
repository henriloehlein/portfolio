# Deployment — GitHub + GitHub Pages

Diese Seite ist **statisch** (kein Build). Sie liegt im öffentlichen Repo und wird über
**GitHub Pages** ausgeliefert. Jeder Push auf `main` deployt automatisch neu.

## Setup (bereits eingerichtet)

- **GitHub-User:** `occuraiin`
- **Repo:** `henri-portfolio` (public)
- **Remote:** `https://github.com/occuraiin/henri-portfolio.git`
- **Branch:** `main`
- **Live-URL:** <https://occuraiin.github.io/henri-portfolio/>
- **Tooling:** Henri nutzt sonst **GitHub Desktop** (keine Kommandozeile nötig). Git-Identität:
  `occuraiin` / `henriloehlein@gmail.com`.

## Update-Kreislauf (kein erneutes „Publishen")

> Dateien ändern → **Commit** → **Push origin main** → GitHub Pages baut automatisch neu (~1 Min).

Mit GitHub Desktop:

1. Änderungen sichten, Commit-Nachricht schreiben, **Commit to main**.
2. **Push origin**.
3. Nach ~1 Minute ist die Seite aktualisiert.

Auf der Kommandozeile:

```powershell
cd "D:\Claude Apps\Portfolio Website 16-06\portfolio"
git add -A
git commit -m "Update Portfolio"
git push origin main
```

## Was NICHT veröffentlicht wird

In `.gitignore` ausgeschlossen (bleibt lokal, landet nicht auf der öffentlichen Seite):

- `Lebenslauf_*.pdf` — enthält Telefonnummer und Geburtsdatum (Datenschutz).
- `Bilder/` — Henris Quell-Ablage mit Originalen. Die Website nutzt die sauberen Kopien in
  `assets/img/covers/` (diese sind committet).

## Bekannte Eigenheiten

- **Cache nach Deploy:** Der Browser zeigt teils kurz die alte Version. Fix: hart neu laden oder
  URL mit `?v=2` aufrufen.
- `.nojekyll` liegt im Repo und schaltet die Jekyll-Verarbeitung auf GitHub Pages ab.

## Eigene Domain (optional, später)

Falls eine eigene Domain gewünscht ist: in `index.html` die `canonical`- und `og:url`-Zeilen
anpassen, in den GitHub-Pages-Einstellungen die Custom Domain eintragen und beim Domain-Anbieter
die DNS-Einträge setzen (Apex `A`-Records auf die GitHub-Pages-IPs, `www` als `CNAME` auf
`occuraiin.github.io`). HTTPS aktiviert GitHub Pages automatisch.
