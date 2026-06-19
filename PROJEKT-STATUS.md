# Projekt-Status & Handoff — Henri Löhlein Portfolio
_Stand: 17.06.2026. Diese Datei ist die „Übergabe", damit jede neue Session sofort mit vollem Kontext weiterarbeiten kann. Abschnitt 6 ist die Warteschlange: dort steht, was als Nächstes zu tun ist._

---

## 0 · Schnellstart für eine neue Session

1. **Projektordner / Git-Repo-Wurzel:** `D:\Claude Apps\Portfolio Website 16-06\portfolio`
   (`index.html` liegt direkt darin; `.git` ebenfalls.)
2. **In neuer Session sagen:** „Arbeite im Ordner `…\Portfolio Website 16-06\portfolio` weiter, lies zuerst `PROJEKT-STATUS.md`."
3. **Live-Vorschau starten:** Preview-Server mit Name `portfolio` starten (Config in `.claude/launch.json`, Befehl `npx serve portfolio -l 4321`).
4. **Umgebungs-Eigenheiten dieser Maschine (wichtig):**
   - **Bash-Tool gibt nichts aus** → immer **PowerShell** verwenden. Bei `git commit` mit mehrzeiliger Nachricht: PowerShell 5.1 zerlegt `-m "…"` mit Anführungszeichen/Slashes; stattdessen Nachricht via `[System.IO.File]::WriteAllText($f,$body,(New-Object System.Text.UTF8Encoding($false)))` in eine Datei außerhalb des Repos schreiben und `git commit -F $f` nutzen (kein BOM). `Remove-Item` auf Temp-Pfade wird teils vom Sandbox-Guard blockiert → Temp-Datei einfach liegen lassen.
   - **Preview-Screenshot scheitert/timeoutet bei großem Viewport** (schwacher Software-Renderer), besonders mit Dauer-Animationen. Lösung: Animationen vor dem Screenshot einfrieren (`*{animation-play-state:paused!important;animation-duration:0s!important}` als injiziertes `<style id="__freeze">`) und/oder mobil testen. Die Preview-Fläche ist nur ~520–590 px breit; für Desktop-Layout `preview_resize` auf z. B. 1320×840, dann rendert der Renderer das volle Layout als verkleinertes Thumbnail (links oben). Detailwerte besser per `preview_eval` / `preview_inspect` prüfen.
   - Beim Reload setzt die Preview Scrollposition/Größe teils zurück; Preloader ggf. per `#preloader.classList.add('is-done')` + `document.body.classList.add('loaded')` + Hero `#approach.classList.add('is-ready')` „durchschalten", sonst bleibt der Titel eingeklappt.
   - `npx serve` stürzt gelegentlich ab → bei `ERR_CONNECTION_REFUSED` Server stoppen und neu starten.

---

## 1 · Was das ist
Persönliches **UX/UI-Portfolio** für Henri Löhlein (UX/UI-Designer, Hochschule Ansbach, Bachelorand bei Syntegon; wohnhaft Rothenburg ob der Tauber). Statische Website (reines HTML/CSS/JS, **kein Build**), gebaut aus seinem Notion-Portfolio und seinem Lebenslauf.

**Design-Idee:** editorial, dark-first, „warm/kühl"-Gradient als Signatur (Koralle/Amber → Indigo/Blau), spiegelt sein Designprinzip (warme Akzente für Empathie + Blau für Klarheit, Gradients als Alleinstellungsmerkmal). Thema: Psychologie × Design, „zwischen Unterstützung und Manipulation", plus Betonung auf KI / LLMs / adaptive Systeme.

## 2 · Dateien
```
portfolio/
├─ index.html              # gesamte Seite + versteckte Case-Study-Inhalte (#cases)
├─ css/styles.css          # komplettes Design-System
├─ js/main.js              # Preloader, Cursor, Reveal, i18n DE/EN, Theme, Modals, Blasen, Skills-Orbit
├─ favicon.svg             # „HL"-Marke im Gradient
├─ assets/img/             # Case-Study-Screenshots aus Notion (persona, journey, dashboard …)
├─ assets/img/covers/      # Cover-Bilder (portrait.jpg, steady.png, milo.png, cognify.png, syntegon.jpg, forwerts.png)
├─ Bilder/                 # Henris Quell-Ablage (Originale, krude Dateinamen) — GITIGNORED, nicht published
├─ Lebenslauf_…_.pdf       # CV mit Telefonnr./Geburtsdatum — GITIGNORED (Datenschutz!), nicht published
├─ vercel.json             # (für evtl. Vercel; bei GitHub Pages ungenutzt)
├─ .nojekyll               # schaltet Jekyll auf GitHub Pages ab
├─ DEPLOY.md · PROJEKT-STATUS.md
```

**Cover (assets/img/covers/):** Saubere, web-taugliche Kopien aus `Bilder/`. Wer ein Cover austauschen will, legt es unter exakt diesen Namen ab. `forwerts.png` ist ein Logo (wird `object-fit:contain` auf weißem Grund dargestellt), `syntegon.jpg` ist das SynTiso-Branding.

## 3 · Seitenaufbau (aktueller Stand)
Reihenfolge von oben:
1. **Top-Bar** (fixed, minimal): nur **DE/EN** + **Theme-Toggle**. Kein Logo.
2. **Header-Streifen** (`.strip`, volle Breite, leicht transparent-weißer Horizontalstreifen mit Blur): **Porträt mittig** (neutral, ohne Gradient-Tint, `brightness .9`, dezenter Ring), **Cover-Bilder links & rechts** verteilt (`.strip__aside--left/right`, ab ≤920 px ausgeblendet), darunter zentriert untereinander: „UX/UI Designer / Henri Löhlein / Bachelorand bei Syntegon / Hochschule Ansbach".
3. **Subnav** (`.subnav`, sticky, randlos): Sektionslinks **horizontal über die volle Breite gestreckt** (`space-between`), größere ruhige Wörter, keine Card/kein Rand; nur im `is-stuck`-Zustand zarter Blur-Hintergrund.
4. **Opening** (`#approach`, kombiniert): kinetischer Titel „Design / an der Grenze / [Rotator]" + **persönliche Vorstellung** (KI/LLMs/adaptive Systeme + Neugier auf die Zukunft) + CTA, danach **Haltung** (Manifesto-Kette + Note). Intro und Haltung sind bewusst in einer Sektion zusammengeführt.
5. **Interessen** (`#focus`): 4 Flip-Cards (Nudging, Dark Patterns, Persuasive Design, Adaptive KI) + **Skills-Orbit** (`#orbit`): 16 CV-Begriffe, schweben/prallen in einer Ellipse, randlos, alle grau (keine Sonderfarbe mehr).
6. **Arbeiten** (`#work`): 5 Projekte mit Cover-Plates, Klick → Case-Study-Modal.
7. **Über mich** (`#about`, inkl. Methode + Marquee) · **Kontakt** (`#contact`) · Footer.

**Schwebende Blasen** (`#bubbleField`, fixed, viewport-weit): je eine pro Projekt mit Cover, treiben **nur in den linken/rechten Padding-Bändern** (nie über den mittigen Inhalt), wrappen horizontal (links raus → rechts rein), transparent mit Konturen-Shine, **auf Mobil (<760 px) ausgeblendet**. Klick → Vorschau-Karte (siehe Abschnitt 6 — wird gerade überarbeitet).

**Projekte/Case Studies:** steady, Milo (beide ausführlich), Cognify (in Bearbeitung), Syntegon-Bachelorarbeit (vertraulich, eingeschränkt), forwerts-Praktikum.

## 4 · Design-Tokens
- Fonts: **Fraunces** (Display-Serif), **Inter** (Body), **Space Grotesk** (Mono) via Google Fonts.
- Signatur-Gradient: `#ff6b5e → #ffb347 → #ff8fb1 → #6c5cef → #4d8dff`.
- Dark: bg `#0a0a0f`. Light über `[data-theme=light]`. Warm-Akzent `--warm-1:#ff6b5e`. Sticky-Offset `--nav-h:60px`.

---

## 5 · DEPLOYMENT
- **Weg:** GitHub + **GitHub Pages**. **User:** `henriloehlein` · **Repo:** `portfolio` (public) · **Branch:** `main`.
- **Remote:** `https://github.com/henriloehlein/portfolio.git` · **Live:** **https://henriloehlein.github.io/portfolio/**
- **Push = Deploy:** Push auf `main` → Pages baut automatisch neu (~1 Min). Henri nutzt sonst **GitHub Desktop**.
- **Letzter Feature-/Site-Commit:** `1254731` „Refine header: centered portrait + name, side covers, gutter-only bubbles" (gepusht, live). Danach folgen nur Doku-Updates (diese Datei, `README.md`, `DEPLOY.md`).
- **Datenschutz:** `Lebenslauf_*.pdf` und `Bilder/` sind in `.gitignore` und werden **nicht** veröffentlicht. `assets/img/covers/` ist committet (von der Seite genutzt).
- **Cache-Eigenheit:** Nach Deploy zeigt der Browser teils die alte Version (gecacht); hart neu laden oder `?v=` anhängen.

---

## 6 · WARTESCHLANGE — als Nächstes zu tun ⬅️

> Hinweis: Ein erster Anlauf für diese Aufgabe wurde begonnen und bewusst **per `git restore js/main.js` zurückgesetzt** (halbfertig/fehlerhaft), damit die Live-Seite funktionsfähig bleibt. Sauber von vorn beginnen. Der Site-Code (HTML/CSS/JS) ist live und unverändert auf Commit `1254731`; nur die Docs wurden danach aktualisiert.

### TODO 1 — Blasen-Vorschau („Pop-up") überarbeiten  ✅ ERLEDIGT & GEPUSHT (18.06.2026)
**Umgesetzt (Neuaufbau):** Das Pop-up ist jetzt ein **eigenes, vollständig deckendes Element** statt der „aufgeblasenen" Blase. Grund für den Neuaufbau: die alte Morph-Lösung vererbte die Inline-`opacity` der Blase (~0.3–0.56) auf die Karte (Inline schlägt CSS-Klasse), darum war die Karte halbtransparent und der ganze Screen wirkte trüb. Neu: `.bubbleScrim` solid dunkel (`rgba(6,6,10,.86)`), **kein** `backdrop-filter` mehr. `.bubbleStage` (flex, zentriert) hält die Karte `.bubblePop` (420×500, geclamped; oben Cover-Banner 44 %, unten solides `--surface-2`-Panel mit Kicker `--warm-1`, Name, Nutzen-Zeile, Live-Tease) und darunter den frei stehenden Link `.bubbleLink` („Zum ganzen Projekt · Case Study →" → `openProject(id)`). Stage ist `pointer-events:none`, Klicks fallen auf den Scrim durch (schließt); Karte/Link `pointer-events:auto`. Blasen driften unverändert weiter, Klick öffnet nur noch das Pop-up. DE/EN für Kicker/Nutzen/Link. Verifiziert per `preview_eval` + Screenshot (dark+light): Karte `opacity:1`, Panel solide `--surface-2`, Scrim ohne Blur, keine Console-Errors.

<details><summary>Ursprüngliche Aufgabenbeschreibung</summary>

**Problem:** Beim Klick auf eine Blase wird der ganze Screen trüb/geblurrt und das Pop-up selbst wirkt matschig/kontaktarm (Cover liegt vollflächig hinter dem Text, dazu `backdrop-filter:blur` auf dem Scrim).

**Soll-Zustand:**
1. **Scrim entmatschen:** Hintergrund klar abdunkeln statt stark blurren (z. B. `rgba(8,8,12,.7)` mit höchstens `blur(2px)`), damit das Pop-up scharf „poppt".
2. **Pop-up größer:** ca. `ow ≈ 420 px`, `oh ≈ 500 px` (statt 340×400). Clamps an Viewport behalten.
3. **Pop-up-Layout neu (saubere Karte, nicht Text-über-Bild):**
   - **Oben Header-Banner** mit dem **Cover-Screenshot** (ca. obere 44 %, `object-fit:cover`).
   - **Unten solides Panel** (`var(--surface-2)`, theme-aware Textfarben, NICHT weiß) mit:
     - kleine **Kategorie**-Kicker-Zeile (warm/`--warm-1`),
     - **Projektname**,
     - **Nutzen-Zeile** (prägnant, was das Projekt bringt, z. B. „KI für Senioren und Zugänglichkeit"),
     - **kurze Zusammenfassung** (der bestehende `project__tease`-Text, sprachsynchron live aus dem DOM).
4. **Frei stehender Link UNTER der Karte** (auf dem Scrim, zentriert, anklickbare Schrift — kein Button-Kasten im Pop-up), z. B. „**Zum ganzen Projekt · Case Study →**" → öffnet die vollständige Case Study (`openProject(id)`). DE/EN je nach `lang`.
5. Schließen via Scrim-Klick / ESC bleibt.

**Texte je Projekt (DE / EN), fertig zum Einsetzen:**

| id | Kategorie (Kicker) | Nutzen-Zeile |
|----|--------------------|--------------|
| steady | Behavioral Design | DE: „Hält Menschen mit psychologischen Mechaniken an ihren Routinen." · EN: „Keeps people on track with psychology-based mechanics." |
| milo | Inclusive Design · KI / AI | DE: „KI-Assistenz für Senioren, mit Fokus auf Vertrauen und Zugänglichkeit." · EN: „AI assistance for seniors, focused on trust and accessibility." |
| cognify | AR E-Learning | DE: „Lernen mit Augmented Reality, Quizzes und Gamification." · EN: „Learning with augmented reality, quizzes and gamification." |
| syntegon | Industrial UX · Bachelorarbeit / Bachelor thesis | DE: „Visualisierung für die Pharmaproduktion, die Bediener sicher führt." · EN: „Pharma-production visualisation that guides operators safely." |
| forwerts | E-Commerce UX · Praktikum / Internship | DE: „Funnel- und Screen-Design mit nachweislich besserer Conversion." · EN: „Funnel and screen design with measurably better conversion." |

**Implementierungs-Hinweise:**
- Alles in `js/main.js` → `initBubbles()` (Funktionen `open(b)` / `close()`, Element-Template, Scrim) und in `css/styles.css` → `.bubble`, `.bubble.is-open`, `.bubble__*`, `.bubbleScrim`.
- Blasen sind `<760px` per CSS `display:none` → Pop-up ist faktisch Desktop-only, kein Mobil-Sonderfall nötig.
- Den frei stehenden Link am besten als eigenes, einmaliges Element (wie der Scrim) an `document.body` hängen, beim Öffnen unter der zentrierten Karte positionieren (`top = (vh+oh)/2 + ~18px`, `left:50%`, `translateX(-50%)`), `z-index` über der Karte.
- Neue i18n-Keys (Kategorie/Nutzen/Link-Label) im `EN`-Wörterbuch ergänzen bzw. per `lang` direkt setzen. `prefers-reduced-motion` respektieren.
- Danach im Preview verifizieren (Desktop 1320 + ggf. Animationen einfrieren), keine Console-Errors, dann committen + pushen (Deploy).

</details>

---

## 7 · Henris Anforderungen an Texte (gilt dauerhaft)
- **Keine Em-Dashes.** Stattdessen Komma, Punkt oder Doppelpunkt. (Gilt als AI-Tell.)
- **Nie den Leser direkt ansprechen** (kein „du", kein „Lass uns", keine Imperative an Lesende). Über sich selbst in „Ich"-Form ist ok.
- **Nicht generisch / keine Marketing-Floskeln** — konkret, spezifisch, editorial.
- Große Titel dürfen für sich stehen (kein erklärender Satz unter jedem Kapitel).
- **EN-Wörterbuch immer synchron halten:** Wird ein DE-Text mit `data-i18n` geändert, den passenden Key in `js/main.js` (`EN`) anpassen.

## 8 · Notion-Quelle (Referenz)
Hauptseite „Henri Löhlein - UX/UI Design" (DE/EN), Datenbank „Meine Projekte", über den Notion-Connector erreichbar (Suche „Henri Löhlein UX/UI"). Englische Originalversionen der Projekte existieren dort ebenfalls.
