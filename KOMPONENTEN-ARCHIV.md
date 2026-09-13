# Komponenten-Archiv

Kurzes Register für Komponenten, die komplett aus der Seite entfernt wurden (nicht nur umgebaut). Zweck: nichts geht verloren, ohne dass alter Code dauerhaft im aktiven Kontext (PROJEKT-STATUS.md, CLAUDE.md) mitgeschleppt wird. Der volle Code steht im Git-Verlauf, hier nur Fundstelle + Kurzbeschreibung.

Wiederherstellen, z. B. für die Blasen:
```bash
git show 4cc8b13:css/styles.css > /tmp/alte-styles.css   # ganze Datei zum Vergleich
git log -p --follow -- js/main.js | less                # Verlauf einer Datei durchsuchen
```
Oder gezielt eine Stelle ansehen: `git show <hash>:<pfad>` mit dem Hash aus dem jeweiligen Eintrag unten.

---

## Schwebende Blasen (Bubbles)
- **Entfernt:** 2026-09-13
- **Letzter Stand vor Entfernung:** Commit `4cc8b13`
- **War:** `#bubbleField` (HTML), `.bubble*`/`.bubbleScrim`/`.bubbleStage`/`.bubblePop*`/`.bubbleLink` (CSS), `initBubbles()` in `js/main.js`. Pro Projekt eine treibende Bubble mit Cover-Bild in den linken/rechten Padding-Bändern, Klick öffnete eine eigene Vorschau-Karte (Cover + Kicker/Name/Benefit/Tease + Link zur vollen Case Study). Auf Mobil (<760px) ohnehin ausgeblendet.
- **Fundstelle für vollen Code:** `git show 4cc8b13:css/styles.css` (Zeilen um `.bubbles`/`.bubble`), `git show 4cc8b13:js/main.js` (Funktion `initBubbles`, Kommentar „Floating bubbles"), `git show 4cc8b13:index.html` (Zeile mit `id="bubbleField"`).
- **Warum entfernt:** auf Wunsch, kein dokumentierter fachlicher Grund.

## Skills-Orbit („Fähigkeiten & Werkzeuge")
- **Entfernt:** vor dem 08.09.2026-Umbau (Sektionsreihenfolge-Umbau)
- **Letzter Stand vor Entfernung:** Commit `9806b8a` (Elternteil von `1259ff1`, dem Entfernungs-Commit)
- **War:** eigene Sektion `#orbit`/`#focus__skills`, 16 schwebende CV-Begriffe in Orbit-Anordnung. HTML, CSS (`.orbit*`, `.focus__skills`), JS (`initOrbit`).
- **Fundstelle für vollen Code:** `git show 9806b8a:index.html`, `git show 9806b8a:css/styles.css`, `git show 9806b8a:js/main.js`.
- **Warum entfernt:** Teil der Restrukturierung (Projekte zuerst, neues Werkzeugband). Laut `PROJEKT-STATUS.md` ist ein neuer „Skills"-Baustein an anderer Stelle geplant, aber noch offen.
