# Komponenten-Archiv

Kurzes Register für Komponenten, die komplett aus der Seite entfernt wurden (nicht nur umgebaut). Zweck: nichts geht verloren, ohne dass alter Code dauerhaft im aktiven Kontext (PROJEKT-STATUS.md, CLAUDE.md) mitgeschleppt wird. Der volle Code steht im Git-Verlauf, hier nur Fundstelle + Kurzbeschreibung.

Wiederherstellen, z. B. für die Blasen:
```bash
git show 4cc8b13:css/styles.css > /tmp/alte-styles.css   # ganze Datei zum Vergleich
git log -p --follow -- js/main.js | less                # Verlauf einer Datei durchsuchen
```
Oder gezielt eine Stelle ansehen: `git show <hash>:<pfad>` mit dem Hash aus dem jeweiligen Eintrag unten.

---

## Abschnitte „Wie ich arbeite“ und „Über mich“, Subnav, Abschnitts- und Projektnummern
- **Entfernt:** 2026-09-29
- **Letzter Stand vor Entfernung:** Commit `7e61800`
- **War:** `nav.subnav#subnav` mit vier Links (JS: Sticky-Zustand und aktiver Link, Magnet-Effekt `.magnetic`); die Nummern `01`–`04` in den `.sectionTag` und `.project__index` `01`–`05` in der Projektliste. `section.hero#how` („Wie ich arbeite“) mit Toolband, dreizeiliger `.hero__title` samt Rotator `#rotator`, `.hero__lede`, `.hero__cta`, der Haltungs-Kette `.approach` und dem Absatz `.about__method`. `section.about#about` („Über mich“) mit `.about__grid` (Psychologie & Design, Blick nach vorn), `.focus__title` mit vier Flip-Karten `.fcard` und dem Interessen-Marquee. Dazu die Kontaktkarten als Boxen mit Anheben beim Hover und die Überschrift „Offen für Projekte, die echte Probleme lösen.“
- **Fundstelle für vollen Code:** `git show 7e61800:index.html`, `git show 7e61800:css/styles.css` (Blöcke „Subnav“, „Hero · text only“, „Approach“, „Interests / Focus“, „About“, „Contact“), `git show 7e61800:js/main.js` (Blöcke „Nav scroll state + active link“, „Rotator“, „Magnetic buttons“, „Interest flip-cards“).
- **Warum entfernt:** Neuaufbau nach der Vorschau `denkweise-preview.html`: eigener Abschnitt Tools, danach Vorgehen (Metall-Überschrift, vier Phasen mit Linienzug) und Schwerpunkte (Psychologie im Design, Innovative Technologien), Kontakt als offene Zeilen. Die Toolband-Markup und ihr CSS leben im Abschnitt `#tools` weiter.

## Anekdoten-Karten „Woher mein Interesse kommt“ (nur Preview)
- **Entfernt:** 2026-09-29
- **Letzter Stand vor Entfernung:** nie im Git, stand nur in der lokalen `denkweise-preview.html` (per `.gitignore` ausgeschlossen)
- **War:** zwei Flip-Karten unter den Schwerpunkten („Warum das Kreuz oben in der Ecke sitzt“ zum ersten UX-Kurs, „Warum kaum jemand wechselt“ zum Apple-Ökosystem), `.an`/`.an-grid`/`.acard*`, Symbole `ico-ad`, `ico-eco`, `ico-turn`, dazu ein kleiner Klick- und Tastatur-Handler.
- **Fundstelle für vollen Code:** [`docs/archiv/anekdoten-karten.md`](archiv/anekdoten-karten.md) mit HTML, Symbolen, CSS und JS.
- **Warum entfernt:** auf Wunsch; die Geschichten bleiben als möglicher Einstieg für die Schwerpunkte oder eine Case Study vorgemerkt.

## Preloader (Namens-Animation mit 0→100-Zähler)
- **Entfernt:** 2026-09-18
- **Letzter Stand vor Entfernung:** Commit `3282087`
- **War:** `div.preloader#preloader` (HTML) mit `.preloader__name` (Name buchstabenweise eingeflogen), `.preloader__bar`, `.preloader__meta` und `.preloader__count`. CSS-Block „Preloader". JS: der `finish()`-Block in `js/main.js`, der nach 1500 ms `is-done` setzte, `body.loaded` und `hero.is-ready` vergab und danach Rotator + Typing-Zeile startete.
- **Fundstelle für vollen Code:** `git show 3282087:index.html` (Abschnitt „PRELOADER"), `git show 3282087:css/styles.css` (Block „Preloader"), `git show 3282087:js/main.js` (Block „Preloader").
- **Warum entfernt:** Er verzögerte den ersten sichtbaren Inhalt um rund 1,5 Sekunden, ohne etwas zu laden. Für eine Bewerbungsseite ist das reine Reibung; der Inhalt steht jetzt sofort.

## Hero-Manifest (H1 „Design an der Grenze" + Wort-Rotator)
- **Entfernt:** 2026-09-18
- **Letzter Stand vor Entfernung:** Commit `3282087`
- **War:** `section.hero#how` mit dreizeiliger `.hero__title`, dem Akzentwort-Rotator `.rotator`/`#rotator` (JS `startRotator`, Wörter „Unterstützung / Begleitung / Empathie / Vertrauen"), `.hero__lede` und dem CTA. CSS-Block „Hero · text only" samt `@property --ang`, `.gradtext`, `.gtxt` und den Keyframes `gradPan`/`gradBreathe`/`angShift`.
- **Fundstelle für vollen Code:** `git show 3282087:index.html`, `git show 3282087:css/styles.css` (Block „Hero · text only"), `git show 3282087:js/main.js` (Block „Rotator").
- **Warum entfernt:** Thesenhafte Selbstbeschreibung ohne Beleg. Ersetzt durch `section.intro#intro`: eine Zeile Positionierung, ein Absatz mit Studium, Stationen und gesuchter Rolle, drei Fakten (Verfügbarkeit, Arbeitsform, Standort) und zwei Aktionen. Der CTA lebt weiter, umbenannt von `.hero__cta*` zu `.cta*`.

## Haltungs-Kette („Lösungen folgen Bedürfnissen …")
- **Entfernt:** 2026-09-18
- **Letzter Stand vor Entfernung:** Commit `3282087`
- **War:** `div.approach` mit `.approach__chain`, drei `.approach__line` (i18n-Keys `chain.1a` … `chain.3b`) und `.approach__note`. Dazu der Sonderfall in `js/main.js`, der `.reveal`-Kinder von `.approach__chain` gestaffelt einblendete, und `data-stagger` im Split-Code.
- **Fundstelle für vollen Code:** `git show 3282087:index.html` (Abschnitt „WIE ICH ARBEITE"), `git show 3282087:css/styles.css` (Block „Approach").
- **Warum entfernt:** Behauptete Haltung statt belegter Arbeit. Die Methodik steht ohnehin belegt in den Case Studies (Card Sorting, Journey Maps, Usability-Tests mit Teilnehmerzahlen) und komprimiert im neuen Profil-Block.

## Werkzeugband (Toolband)
- **Entfernt:** 2026-09-18
- **Letzter Stand vor Entfernung:** Commit `3282087`
- **War:** `div.toolband` in der Hero-Sektion: Glasband mit `.toolband__sicht`/`.toolband__track` und sieben Werkzeug-Items als Inline-SVG (Figma, Adobe XD, Photoshop, Claude Code, v0, Dyad, GitHub), einmal dupliziert für die Endlos-Marquee. CSS-Block „Toolband" samt Keyframes `toolbandRun`/`toolbandSheen`.
- **Fundstelle für vollen Code:** `git show 3282087:index.html`, `git show 3282087:css/styles.css` (Block „Toolband").
- **Warum entfernt:** Zu viel Inszenierung für sieben Einträge, und die Auswahl schadete eher: Adobe XD wird seit 2023 nicht mehr weiterentwickelt, Dyad und v0 sind in Design-Abteilungen kaum bekannt. Ersetzt durch eine nüchterne Chip-Liste im Profil-Block (Figma, Photoshop, Miro, Claude Code, v0, GitHub).

## Flip-Karten „Das Zusammenspiel von Psychologie und Design"
- **Entfernt:** 2026-09-18
- **Letzter Stand vor Entfernung:** Commit `3282087`
- **War:** `.focus__head`/`.focus__title` plus `.focus__grid#focusGrid` mit vier `.fcard` (Nudging, Dark Patterns, Persuasive Design, Adaptive KI), je Vorder- und Rückseite in 3D-Flip (`.fcard__inner`, `.fcard__face`, `.fcard__front`, `.fcard__back`, `.fcard__icon`, `.fcard__num`). JS: Tap-Toggle und Enter/Space-Handler für `.fcard`.
- **Fundstelle für vollen Code:** `git show 3282087:index.html` (Abschnitt „ÜBER MICH"), `git show 3282087:css/styles.css` (Block „Interests / Focus"), `git show 3282087:js/main.js` (Block „Interest flip-cards").
- **Warum entfernt:** Die vier Karten präsentierten Interessen wie Leistungen und wiederholten zum vierten Mal dieselbe Aussage (Meta-Description, Hero-Lede, beide About-Spalten). Der Inhalt steht jetzt in einem Absatz „Schwerpunkt" im Profil-Block.

## Interessen-Marquee („Leidenschaften & Interessen")
- **Entfernt:** 2026-09-18
- **Letzter Stand vor Entfernung:** Commit `3282087`
- **War:** `.about__passions` mit `.about__passionsLabel` und `.marquee`/`.marquee__track`: acht Begriffe (Verhaltenspsychologie, Künstliche Intelligenz, Persuasive Design, Typografie, Prototyping, Mensch-Maschine-Interaktion, Ethik im Design, Gamification), dupliziert für den Endlos-Lauf. CSS-Block am Ende von „About" samt Keyframe `marquee`.
- **Fundstelle für vollen Code:** `git show 3282087:index.html`, `git show 3282087:css/styles.css` (Suche nach `.marquee`).
- **Warum entfernt:** „Leidenschaften & Interessen" ist ein Studenten-Marker; die Liste sagte nichts über Können aus. Fachliches daraus ist in die Methoden- und Schwerpunkt-Angaben des Profil-Blocks gewandert.

## About-Spalten „Psychologie & Design" / „Blick nach vorn" / „Methode"
- **Entfernt:** 2026-09-18
- **Letzter Stand vor Entfernung:** Commit `3282087`
- **War:** `.about__grid` mit zwei `.about__col` (i18n `about.h1`/`about.p1`, `about.h2`/`about.p2`) und `.about__method` (`about.h3method`/`about.pmethod`).
- **Fundstelle für vollen Code:** `git show 3282087:index.html` (Abschnitt „ÜBER MICH"), `git show 3282087:css/styles.css` (Block „About").
- **Warum entfernt:** Drei Absätze Prosa über Haltung und Interessen, ohne prüfbare Angaben. Ersetzt durch `section.profile#about`: Stationen als Zeitleiste (`.timeline`), ein Absatz „Schwerpunkt" und Chip-Listen für Methoden, Werkzeuge und Sprachen.

## Typing-Zeile in der Navleiste
- **Entfernt:** 2026-09-18
- **Letzter Stand vor Entfernung:** Commit `3282087`
- **War:** `.nav__skills#typeSkills` plus `#typeSkillsSr` (Screenreader-Fassung). JS: `STRIP_WORDS`, `typeLoop`, `startStripType` und `stripGen`; CSS `.nav__skills`, `.typeCursor`, Keyframe `typeBlink`.
- **Fundstelle für vollen Code:** `git show 3282087:js/main.js` (Blöcke „Nav skills line" und `typeLoop`), `git show 3282087:css/styles.css` (Block „Nav").
- **Warum entfernt:** Eine Zeile, die sich endlos selbst tippt und löscht, zieht Aufmerksamkeit ohne Informationsgewinn. An der gleichen Stelle steht jetzt die statische Zeile `.nav__line` mit Rolle und Verfügbarkeit.

## Cursor-Labels
- **Entfernt:** 2026-09-18
- **Letzter Stand vor Entfernung:** Commit `3282087`
- **War:** `.cursor__label#cursorLabel` und die `data-cursor`-Attribute („Case Study", „Kontakt", „Theme", „Mail", „Öffnen", „Schließen", „Hoch") an Projekten, Buttons und Links. CSS `.cursor__label`, `.cursor.is-label`; JS las `data-cursor` im `mouseover`-Handler.
- **Fundstelle für vollen Code:** `git show 3282087:index.html` (Suche nach `data-cursor`), `git show 3282087:css/styles.css` und `git show 3282087:js/main.js` (Block „Custom cursor").
- **Warum entfernt:** Die Beschriftungen erklärten, was ohnehin sichtbar ist. Der Pfeil-Cursor bleibt, er wird über klickbaren Elementen nur noch etwas größer.

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
