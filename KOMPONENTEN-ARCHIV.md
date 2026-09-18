# Komponenten-Archiv

Kurzes Register für Komponenten, die komplett aus der Seite entfernt wurden (nicht nur umgebaut). Zweck: nichts geht verloren, ohne dass alter Code dauerhaft im aktiven Kontext (PROJEKT-STATUS.md, CLAUDE.md) mitgeschleppt wird. Der volle Code steht im Git-Verlauf, hier nur Fundstelle + Kurzbeschreibung.

Wiederherstellen, z. B. für die Blasen:
```bash
git show 4cc8b13:css/styles.css > /tmp/alte-styles.css   # ganze Datei zum Vergleich
git log -p --follow -- js/main.js | less                # Verlauf einer Datei durchsuchen
```
Oder gezielt eine Stelle ansehen: `git show <hash>:<pfad>` mit dem Hash aus dem jeweiligen Eintrag unten.

---

## Header-Strip (Portrait-Bühne mit Projekt-Covern)
- **Entfernt:** 2026-09-18
- **Letzter Stand vor Entfernung:** Commit `e1199f6`
- **War:** `section.strip#strip` (HTML) unter der Top-Bar: großes rundes Portrait (bis 208 px), Name, Typing-Zeile, links/rechts fünf schräg gestreute Projekt-Cover (`.strip__aside`, `.strip__cover`, `.sc-steady` … `.sc-forwerts`). CSS-Block „Header strip · full-width composition" (`.strip*`). Kein eigenes JS; die Typing-Zeile (`typeLoop`/`startStripType` in `js/main.js`) lebt weiter, jetzt in der Navleiste (`.nav__skills`).
- **Fundstelle für vollen Code:** `git show e1199f6:index.html` (Abschnitt „HEADER STRIP"), `git show e1199f6:css/styles.css` (Block „Header strip").
- **Warum entfernt:** Header sollte dezenter und flacher werden. Portrait (36 px), Name und Typing-Zeile sind in die Top-Bar links gewandert (`.nav__id`), die Subnav rückt direkt darunter: Subnav-Unterkante bei ~125 px statt ~586 px auf 1440 px Breite, der Projekte-Titel steht damit im ersten Viewport.

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
