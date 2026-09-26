# Projekt-Status und Übergabe

_Stand: 26.09.2026. Einstieg für Claude Code, Codex und beide Geräte._

## Direkt weiterarbeiten

- Arbeitsbasis: `index.html`, `css/styles.css`, `js/main.js`. Statisches HTML/CSS/JavaScript, kein Build-Schritt.
- Lokale Vorschau: statischen Server aus der Repo-Wurzel verwenden und `/index.html` öffnen. Zuletzt lief sie unter `http://127.0.0.1:8080/index.html`.
- Aktueller Fokus: Projektpräsentationen im Portfolio schärfen. Die forwerts-Darstellung ist in die aktive Seite übernommen. Weitere Änderungen mit Henri schrittweise erarbeiten.
- Cognify (Stand 26.09.2026): Die ausführliche Case Study ist veröffentlicht, auf Deutsch und Englisch (`cs.cognify.*` in `js/main.js`), mit Bildern in `assets/img/case-studies/cognify/`. Henri hat die Texte freigegeben. Der Status „In Bearbeitung“ auf der Projektkarte ist entfernt. Als optionaler nächster Schritt ist ein Abschnitt „Überarbeitung“ mit 3 bis 5 überarbeiteten Screens vor dem Fazit geplant (in Figma, auf einer neuen Seite der Hi-Fi-Datei). Quellen, Zahlen und Entscheidungen: `docs/COGNIFY-CASE-STUDY-MATERIAL.md`.
- Überarbeitung aller Case Studies (Stand 26.09.2026, veröffentlicht): steady und Milo aus Henris Abgabeordnern neu aufgebaut, erstmals mit englischer Übersetzung (`cs.steady.*`, `cs.milo.*`). Syntegon auf die abgeschlossene Bachelorarbeit umgestellt, wegen Sperrvermerk nur abstrakt und ohne Screens. Cognify mit gleichen Texten, aber Lo-Fi/Hi-Fi-Umschalter statt Slider und statischen Screenreihen. forwerts unverändert. Neue Darstellungsformen in `css/styles.css` unter „Case-study formats“: statische Screenreihe, Screen mit nummerierten Anmerkungen, Punktdiagramm für Testergebnisse, Vorher/Nachher-Konzept, Gestaltungsspezifikation, Strukturdiagramme. Slider nur noch für echte Abfolgen. Quellen und Grenzen: `docs/STUDIENPROJEKTE-MATERIAL.md`. Abschnitte in den Case Studies haben kein Seiten-Padding mehr, Abschnittsüberschriften stehen in Fraunces. Header (Porträt, Name, Abstände) und Abstand zur Subnav sind vergrößert, die Umschalter rechts unverändert. Offen: Subnav-Zeile „Bachelorand bei Syntegon“ ist seit Juli 2026 überholt.
- `preview-neu.html` ist ein geparktes Redesign-Experiment. Seine früheren To-dos sind verworfen.
- Vor Änderungen `CLAUDE.md` beziehungsweise `AGENTS.md` lesen, Git-Status und Remote-Stand prüfen. Lokale Arbeit erhalten.

## Aktive Seite

Navigation, Projekte mit Case-Study-Modals, Arbeitsweise und Werkzeugband, Profil und Psychologie-Themen, Kontakt und Footer. Das bestehende dunkle und helle Design, Fraunces, Inter und Space Grotesk bleiben die Grundlage.

Die Inhalte der Case Studies liegen als versteckte `<article data-case="…">` in `index.html` und werden beim Öffnen nach `#modalContent` kopiert. Deutsche Texte stehen im HTML, englische `data-i18n`-Texte im `EN`-Dictionary von `js/main.js`.

Das Werkzeugband unter „Wie ich arbeite“ zeigt Figma, Adobe CC, Microsoft Office, Claude Code, v0, Codex und GitHub als stilisierte, einfarbige Zeichen (Adobe XD, Photoshop und Dyad wurden am 26.09.2026 entfernt).

Die Schlagworte unter den Projektkarten (`.project__tags`) sind keine Pills mehr, sondern eine Zeile in Fraunces kursiv mit feinen Schrägstrichen als Trenner. Ein Status wie „In Bearbeitung“ trägt die Klasse `project__status` und erscheint in Mono-Versalien (derzeit auf keiner Karte in Gebrauch). Die Schlagworte benennen Themen und Prinzipien in Begriffen, die Recruitern und Firmen etwas sagen. Keine Methoden wie Card Sorting und keine akademischen Modelle wie die Self-Determination Theory; beides steht in den Case Studies. Englisch über `p.<projekt>.tagN` in `js/main.js`.

## forwerts: übernommener Stand

Stand 26.09.2026: Aufbau umgestellt von „das sind meine Projekte“ auf „das waren meine Aufgaben, hier Auszüge aus Projekten“:

- Allgemein gehaltener Einstieg (Online-Shops, Kundenportale und Websites für Konzerne aus der Telekommunikations- und Energiebranche). Meta nennt „Rolle: UX Expert Intern“ und „Kunden: 1&1 · Vattenfall“.
- Hauptteil „Tätigkeitsfelder“: sechs knappe Felder nach dem Zeugnis (Screen-Design, User Flows, Designstruktur, Informationsarchitektur, Visuelle Elemente, Workshops), bewusst ohne Projektzuordnung. Henri hat die Workshops vorbereitet, durchgeführt hat sie sein Betreuer.
- Danach „Auszüge aus Kundenprojekten“. Nur hier werden Tätigkeiten konkret den Projekten zugeordnet. Henri möchte die nicht wörtlich belegten Projekttätigkeiten behalten.
- Bewusst weggelassen: Aufnahmedatum der Screens, Hinweis auf Originalentwürfe, Screen-Anzahlen, Projekt-Chips. Henri empfindet solche Zusätze als überladen.
- Das Praktikum steht nur als Rolle „UX Expert Intern“ in der Übersicht, nicht im Titel oder Kicker.
- Zeitraum laut Zeugnis: September 2024 bis Februar 2025. Kundennamen dürfen laut Henri genannt werden.
- 1&1 Online-Shop: sieben Schritte von Gerätekonfiguration bis Warenkorb, Zubehörstufe im Flow dezent hervorgehoben.
- 1&1 Hilfe-Center: vier Ebenen von Startseite bis Hilfeartikel.
- Vattenfall: zwei getrennte Seitenpaare für Tarif- und Serviceseiten.
- Deutsch und Englisch sind synchron. Die Projektkarte nennt User Flows, Screen-Designs und Designstrukturen.

### Inhaltliche Grenzen und Präferenzen

Henri möchte einen gesamtheitlichen Projektüberblick. Keine erzählerischen Überschriften wie „Von der Frage zur Antwort“, keine detaillierte Behauptung über einzelne UI-Entscheidungen und keine erfundenen Tätigkeiten, Methoden oder Conversion-Zahlen. Das Zeugnis nennt „Mitarbeit und Aufbau einer Design Struktur“ für Bereiche des Kunden-Centers; das darf selbstbewusst formuliert werden, ein vollständig eigenständig entwickeltes Designsystem ist aber nicht belegt.

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
