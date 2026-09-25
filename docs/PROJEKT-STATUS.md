# Projekt-Status und Übergabe

_Stand: 25.09.2026. Diese Datei ist der Einstieg für jede neue Session und für beide Geräte. Sie beschreibt, was live ist, woran gerade gearbeitet wird und wie gearbeitet wird._

---

## 1 · Schnellstart

1. **Repo-Wurzel** ist der Ordner, in dem `index.html` liegt. Der Pfad ist auf jedem Gerät anders, deshalb steht hier keiner.
2. **Zu Beginn einer Session sagen:** „Lies zuerst `docs/PROJEKT-STATUS.md`."
3. **Vor jeder Design- oder Textarbeit** die Skills `taste-skill:taste-skill` und `taste-skill:redesign-skill` aufrufen. Sie laufen nicht automatisch.
4. **Lokale Vorschau:** statischer Server auf den Projektordner, dann `…/preview-neu.html` aufrufen. Die Konfiguration liegt in `.claude/launch.json` (nicht versioniert, gerätespezifisch).
5. **Zwei Geräte:** vor dem Arbeiten `git pull`, nach dem Arbeiten committen und pushen. Nur so sieht das jeweils andere Gerät den Stand.

## 2 · Was live ist

- **Veröffentlichung:** GitHub Pages, Repo `henriloehlein/portfolio` (öffentlich), Branch `main`. Push auf `main` deployt automatisch, Details in `docs/DEPLOY.md`.
- **Live-Struktur** entspricht Commit `3282087` vom 18.09.2026: Preloader, Hero-Manifest mit Wort-Rotator, Haltungs-Kette, Werkzeugband, Projekte mit Case-Study-Modals, Flip-Karten zu Psychologie, Interessen-Marquee, About-Spalten, Kontakt.
- **Nicht veröffentlicht:** Lebenslauf-PDF und der Quellordner `Bilder/`. Beide stehen in `.gitignore` und waren nie in einem Commit.

## 3 · Woran gerade gearbeitet wird

Ein Redesign, das zuerst in einer Preview entsteht und die Live-Dateien unangetastet lässt.

- **Dateien:** `preview-neu.html` mit `css/preview-neu-base.css` (Basis-Design-System), `css/preview-neu.css` (neue Komponenten), `js/preview-neu-main.js` (Basis-Interaktionen) und `js/preview-neu.js` (Preview-Logik und englische Texte).
- **Struktur der Preview:** Navleiste mit Identität, Subnav, kompaktes Intro, Projekte, „Wie ich arbeite" mit vier Phasen und Werkzeugband, Profil mit Stationen und Fakten, Kontakt, Footer.
- **Inhaltliche Linie:** keine studentischen Labels. Kein „Praxissemester", „Bachelorarbeit", „Hochschulprojekt". Stattdessen Firma und Disziplin, etwa „Syntegon, Research & Development" oder „Konzeptprojekt". Die Abschlussnote steht nur einmal, in der Ausbildungszeile der Stationen.
- **Ergänzt:** Titel „Tools, mit denen ich arbeite" über dem Werkzeugband, Miro im Band, Interessen als Randnotiz im Profil (KI, Psychologie im Design, neue Interaktionsformen).
- **Entfernt gegenüber der Live-Seite:** nummerierte Kicker über den Überschriften, Pillen-Optik der Projekt-Tags, Ketten aus Mittelpunkten in Metazeilen.
- **Offen:** Freigabe durch Henri. Erst danach wandert die Preview in `index.html`, `css/styles.css` und `js/main.js`.

## 4 · Wichtige Vorgeschichte

Am 18.09.2026 gab es eine erste Umbau-Iteration, die nie committet wurde. Sie ist am 19.09.2026 verworfen worden. `docs/KOMPONENTEN-ARCHIV.md` beschreibt die Komponenten, die in dieser Iteration entfernt wurden. **Diese Einträge gelten nicht für die Live-Seite**, dort sind die Komponenten weiterhin vorhanden. Das Archiv dokumentiert die Begründungen, nicht den aktuellen Stand.

## 5 · Design-Tokens

- Schriften: **Fraunces** für Display, **Inter** für Fließtext, **Space Grotesk** für Mono, über Google Fonts.
- Signatur-Gradient: `#ff6b5e → #ffb347 → #ff8fb1 → #6c5cef → #4d8dff`.
- Dunkler Grund `#0a0a0f`, helles Thema über `[data-theme=light]`, Warm-Akzent `--warm-1:#ff6b5e`, Sticky-Offset `--nav-h:60px`.

## 6 · Textregeln, dauerhaft gültig

- **Keine Gedankenstriche.** Stattdessen Komma, Punkt oder Doppelpunkt.
- **Lesende nie direkt ansprechen.** Über sich selbst in der Ich-Form ist in Ordnung.
- **Konkret statt generisch.** Keine Marketing-Floskeln.
- Große Titel dürfen für sich stehen, kein erklärender Satz unter jedem Kapitel.
- **Englische Fassung synchron halten:** Wird ein deutscher Text mit `data-i18n` geändert, gehört der Schlüssel in `js/main.js` (Objekt `EN`) angepasst. In der Preview liegen die englischen Texte stattdessen in `js/preview-neu.js` unter `data-i18n-p`.

## 7 · Quellen

Notion-Hauptseite „Henri Löhlein - UX/UI Design" mit der Datenbank „Meine Projekte", deutsch und englisch. Referenzsammlung zur Gestaltung in `docs/REFERENZEN.md`.
