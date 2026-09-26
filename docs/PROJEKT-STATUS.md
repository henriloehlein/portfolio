# Projekt-Status und Übergabe

_Stand: 26.09.2026. Einstieg für Claude Code, Codex und beide Geräte._

## Direkt weiterarbeiten

- Arbeitsbasis: `index.html`, `css/styles.css`, `js/main.js`. Statisches HTML/CSS/JavaScript, kein Build-Schritt.
- Lokale Vorschau: statischen Server aus der Repo-Wurzel verwenden und `/index.html` öffnen. Zuletzt lief sie unter `http://127.0.0.1:8080/index.html`.
- Aktueller Fokus: Projektpräsentationen im Portfolio schärfen. Die forwerts-Darstellung ist in die aktive Seite übernommen. Weitere Änderungen mit Henri schrittweise erarbeiten.
- `preview-neu.html` ist ein geparktes Redesign-Experiment. Seine früheren To-dos sind verworfen.
- Vor Änderungen `CLAUDE.md` beziehungsweise `AGENTS.md` lesen, Git-Status und Remote-Stand prüfen. Lokale Arbeit erhalten.

## Aktive Seite

Navigation, Projekte mit Case-Study-Modals, Arbeitsweise und Werkzeugband, Profil und Psychologie-Themen, Kontakt und Footer. Das bestehende dunkle und helle Design, Fraunces, Inter und Space Grotesk bleiben die Grundlage.

Die Inhalte der Case Studies liegen als versteckte `<article data-case="…">` in `index.html` und werden beim Öffnen nach `#modalContent` kopiert. Deutsche Texte stehen im HTML, englische `data-i18n`-Texte im `EN`-Dictionary von `js/main.js`.

## forwerts: übernommener Stand

Die gewählte Variante C aus `preview-forwerts-varianten.html` ist in der aktiven Case Study umgesetzt:

- Kurzer Einstieg zur Mitarbeit im UX Design bei verschiedenen Kundenprojekten.
- Die drei gezeigten Beispiele sind ausdrücklich eine Auswahl aus Henris Arbeit bei forwerts, kein vollständiger Projektkatalog.
- Zeitraum laut Zeugnis: September 2024 bis Februar 2025.
- Sichtbarer, zurückhaltender Absatz zur Mitarbeit am Aufbau einer Designstruktur für einzelne Bereiche des Kunden-Centers und zu konsistenten Oberflächen über einzelne Screens hinaus.
- Je Kundenprojekt ein sachliches Tätigkeitsprofil, danach eine horizontal scrollbare Bildfolge mit Pfeiltasten und Bildlinks.
- 1&1 Online-Shop: sieben Schritte von Gerätekonfiguration bis Warenkorb, Zubehörstufe im Flow dezent hervorgehoben.
- 1&1 Hilfe-Center: vier Ebenen von Startseite bis Hilfeartikel.
- Vattenfall: zwei getrennte Seitenpaare für Tarif- und Serviceseiten.
- Übergreifende Tätigkeiten unter „Weitere Aufgaben“: Icons, Infografiken, Badges, grafische Ideenausarbeitung und Textvorschläge.
- Deutsch und Englisch sind synchron. Die Projektkarte nennt User Flows, Screen-Designs und Designstrukturen.

### Inhaltliche Grenzen und Präferenzen

Henri möchte einen gesamtheitlichen Projektüberblick. Keine erzählerischen Überschriften wie „Von der Frage zur Antwort“, keine detaillierte Behauptung über einzelne UI-Entscheidungen und keine erfundenen Tätigkeiten, Methoden oder Conversion-Zahlen. Designstrukturen sind belegt; ein vollständig eigenständig entwickeltes Designsystem ist nicht belegt.

Die Tätigkeiten beruhen auf Henris Angaben und dem privat gelesenen Zeugnis. Das Zeugnis selbst bleibt außerhalb des Repos. Die Screens in `assets/img/case-studies/` zeigen öffentliche Website-Ansichten vom 25.09.2026, keine damaligen Originalentwürfe. Die Vattenfall-Tarifaufnahme wurde ohne Cookie-Dialog neu erstellt. Quellen und Dateizuordnung: `docs/FORWERTS-CASE-STUDY-MATERIAL.md`.

### Weitere Entwürfe

- `preview-forwerts-varianten.html`: drei umschaltbare Aufbauvarianten; C ist vorausgewählt. Vergleichsentwurf, keine aktive Startseite.
- `preview-forwerts.html` mit `css/preview-forwerts.css`: früherer separater Showcase. Seine spezifischen Texte sind überholt.
- `preview-neu.html` mit eigener CSS/JS: geparktes Redesign. Nur auf ausdrücklichen Wunsch öffnen.

## Prüfung und Veröffentlichung

Die aktive forwerts-Case-Study wurde im Browser auf Desktop und Mobil geprüft, inklusive horizontaler Pfeilnavigation und Sprachwechsel. Alle 15 Bilddateien sind vorhanden. JavaScript-Syntax und Git-Diff-Prüfung bestanden.

Henri hat am 26.09.2026 Commit und Push des gesamten aktuellen Arbeitsstands für die Übergabe an Claude beauftragt. Repo: `henriloehlein/portfolio`, Branch `main`. Push auf `main` veröffentlicht über GitHub Pages; auch getrackte Vorschauen sind über direkte URLs öffentlich, trotz `noindex`.

Weitere Commits, Pushes und Hosting-Änderungen nur auf entsprechenden Auftrag. Private PDFs, `Bilder/`, Umgebungsdateien und lokale Skill-Ordner bleiben ausgeschlossen.

## Dauerhafte Arbeitsregeln

- Deutsch und Englisch synchron halten.
- Keine Gedankenstriche, Marketing-Floskeln oder direkte Ansprache der Lesenden in den Portfolio-Texten.
- Bestehende Gestaltung und statischen Stack erhalten. Einen passenden primären Design-Skill auswählen, weitere nur für einen eigenen Bedarf.
- `.agents/` und `.claude/` sind lokal und Git-ignoriert; `skills-lock.json` aktiviert keine Skills.
- Relevante visuelle Referenzen stehen in `docs/REFERENZEN.md`. `docs/KOMPONENTEN-ARCHIV.md` nur lesen, wenn entfernte Komponenten oder deren Geschichte relevant sind.
- Die im Archiv beschriebenen entfernten Komponenten sind kein Auftrag, sie wiederherzustellen.

## Einstieg für Claude

„Lies CLAUDE.md und docs/PROJEKT-STATUS.md, prüfe Git und öffne die aktuelle Vorschau von index.html. Wir arbeiten am übernommenen forwerts-Stand und den weiteren Case Studies weiter. Die Redesign-Experimente und ihre alten To-dos bleiben geparkt.“
