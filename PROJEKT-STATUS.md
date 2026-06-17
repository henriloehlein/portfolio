# Projekt-Status & Handoff — Henri Löhlein Portfolio
_Stand: 17.06.2026. Diese Datei ist die „Übergabe", damit jede neue Session sofort mit vollem Kontext weiterarbeiten kann._

---

## 0 · Schnellstart für eine neue Session (Ordner „wieder verknüpfen")

1. **Projektordner:** `D:\Claude Apps\Test\portfolio`
   (Git-Repo-Wurzel ist genau dieser Ordner; `index.html` liegt darin.)
2. **In neuer Claude-Session sagen:** „Arbeite im Ordner `D:\Claude Apps\Test\portfolio` weiter, lies zuerst `PROJEKT-STATUS.md`."
3. **Live-Vorschau starten:** Vorschau-Server mit Name `portfolio` starten (Config liegt in `.claude/launch.json`, Befehl `npx serve portfolio -l 4321`).
4. **Wichtige Umgebungs-Eigenheiten dieser Maschine:**
   - Das **Bash-Tool gibt nichts aus / schreibt nicht** → immer **PowerShell** verwenden.
   - Der **Screenshot der Vorschau scheitert bei großem Viewport** (schwacher Software-Renderer). Lösung: Viewport klein/mobil (z. B. 375 px) ODER Hintergrund-Animationen kurz einfrieren. Layout/Stile besser über `preview_inspect` (computed styles) + `preview_eval` prüfen statt Pixel-Screenshots.
   - `npx serve` ist gelegentlich abgestürzt → bei `ERR_CONNECTION_REFUSED` Server stoppen und neu starten.

---

## 1 · Was das ist
Persönliches **UX/UI-Portfolio** für Henri Löhlein (UX/UI-Designer, Hochschule Ansbach; wohnhaft Rothenburg ob der Tauber). Statische Website (reines HTML/CSS/JS, **kein Build**), gebaut aus den Inhalten seines Notion-Portfolios.

**Design-Idee:** editorial, dark-first, „warm/kühl"-Gradient als Signatur (Koralle/Amber → Indigo/Blau), spiegelt sein erklärtes Designprinzip (warme Akzente für Empathie + Blau für Klarheit, Gradients als Alleinstellungsmerkmal). Thema: Psychologie × Design, „zwischen Unterstützung und Manipulation".

## 2 · Dateien
```
portfolio/
├─ index.html          # gesamte Seite + versteckte Case-Study-Inhalte (#cases)
├─ css/styles.css      # komplettes Design-System
├─ js/main.js          # Preloader, Cursor, Reveal, i18n DE/EN, Theme, Modals
├─ favicon.svg         # „HL"-Marke im Gradient
├─ assets/img/         # 10 echte Screenshots aus Notion (s. u.)
├─ vercel.json         # (für evtl. Vercel; bei GitHub Pages ungenutzt)
├─ .nojekyll           # schaltet Jekyll auf GitHub Pages ab
├─ DEPLOY.md           # ältere Deploy-Anleitung (Git+Vercel) — Pages-Weg s. u.
└─ PROJEKT-STATUS.md   # diese Datei
```

**Bilder (assets/img/):** steady-dashboard, steady-onboarding, steady-persona, steady-journey, milo-persona, milo-journey, cognify-main, cognify-ar, forwerts-1, forwerts-2. (Aus Notion gezogen; die originalen S3-URLs sind längst abgelaufen — diese lokalen Kopien sind die einzige Quelle.)

## 3 · Sektionen
01 Haltung (Manifesto-Kette) · 02 Interessen (4 Flip-Cards) · 03 Arbeiten (5 Projekte, Klick → Case-Study-Modal) · 04 Über mich (inkl. Methode) · 05 Kontakt. Plus Preloader, Custom-Cursor, DE/EN-Toggle, Theme-Toggle, Mobile-Burger.

**Projekte/Case Studies:** steady, Milo (beide ausführlich), Cognify (in Bearbeitung), Syntegon-Bachelorarbeit (vertraulich, eingeschränkt), forwerts-Praktikum.

## 4 · Design-Tokens (für Konsistenz)
- Fonts: **Fraunces** (Display-Serif), **Inter** (Body), **Space Grotesk** (Mono) — via Google Fonts.
- Signatur-Gradient: `#ff6b5e → #ffb347 → #ff8fb1 → #6c5cef → #4d8dff`.
- Dark: bg `#0a0a0f`. Light-Theme über `[data-theme=light]`.
- Akzent warm `--warm-1:#ff6b5e`.

---

## 5 · DEPLOYMENT (wichtig)
- **Weg:** GitHub + **GitHub Pages** (kostenlos, keine eigene Domain).
- **GitHub-User:** `occuraiin` · **Repo:** `henri-portfolio` (public).
- **Remote:** `https://github.com/occuraiin/henri-portfolio.git`
- **Live-URL:** **https://occuraiin.github.io/henri-portfolio/**
- **Tooling:** Henri nutzt **GitHub Desktop** (keine Kommandozeile nötig). Git ist lokal installiert (v2.54), Identität: occuraiin / henriloehlein@gmail.com.

**Update-Kreislauf (kein erneutes „publishen"!):**
> Dateien ändern → in GitHub Desktop **Commit** → **Push origin** → GitHub Pages baut automatisch neu (~1 Min).

**Bekannte Eigenheit:** Nach dem ersten Deploy zeigte der **normale Browser** „nicht erreichbar", Inkognito ging. Ursache war ein gecachter 404. Fix: URL mit `?v=1` aufrufen oder Browser-Cache leeren.

---

## 6 · OFFENE ARBEIT (hier genau weitermachen) ⬅️

**Stand 17.06.2026: Überarbeitungsrunde abgeschlossen, bereit für Commit + Push.**

**✅ Fertig (uncommitted, im Working Tree):**
- `index.html`: Em-Dashes (—) entfernt, keine direkte Leser-Ansprache, „Process/Wie ich arbeite" als **Methode** in „Über mich" integriert, Kapitel-Intro-Sätze entfernt, Sektion 02 → „Interessen", Footer → „Rothenburg ob der Tauber, Bayern", Kontakt-Claim → „Offen für Projekte, die echte Probleme lösen.", 4 Interessen-Cards als **3D-Flip-Markup**.
- `css/styles.css`: Flip-Card-System (`.fcard`, `.fcard__inner`, Faces, Hover/Focus-Flip), **`.about__method`-Styles ergänzt**, **alte `.process`-Regeln entfernt** (Block + Media-Query).
- `js/main.js`: **EN-Wörterbuch an neue DE-Texte angeglichen** (alle `contact.t*`, `footer.made`, `hero.lede`, `about.p1/p2`, neue Keys `about.h3method`/`about.pmethod`, `tag.focus`/`nav.focus` → „Interests"; obsolet `focus.intro`, `work.hint`, `proc.*` raus; alle Texte ohne Em-Dashes). **Flip-Tap-Handler ergänzt** (Touch/Mobil-Toggle, plus Enter/Space-Tastatur-Toggle).

**Verifikation am 17.06.2026 im Preview (mobile 375 px):**
- `.about__method` gerendert (Heading „Methode" in warm-1, Mono-Caps, Body-Lead 17 px / line-height 1.6).
- EN-Toggle vollständig konsistent (Stichproben: Hero-Lede, alle Focus-Cards, About inkl. Method, Contact, Footer, Nav-Focus → „Interests").
- Flip-Card-Tap toggelt `is-flipped` korrekt (matrix3d zeigt rotateY 180°).
- Kein horizontales Overflow.
- Keine Console-Errors.

**Suggested Commit-Messages** (für GitHub Desktop, ggf. in mehreren Commits oder als einer):
1. „Style about__method and remove dead process rules"
2. „Sync EN dictionary with reworked DE copy"
3. „Add tap & keyboard toggle for interest flip-cards"

Untracked obendrauf (sollten ebenfalls in den Commit): `.nojekyll`, `PROJEKT-STATUS.md`.

---

## 7 · Henris Anforderungen an Texte (gilt dauerhaft)
- **Keine Em-Dashes (—)** — gilt als AI-Tell. Stattdessen Komma/Punkt/Doppelpunkt.
- **Nie den Leser direkt ansprechen** (kein „du", „Lass uns", keine Imperative an die Lesenden). Über sich selbst in „Ich"-Form ist ok.
- **Nicht generisch / keine Marketing-Floskeln** — konkret, spezifisch, editorial.
- Große Titel dürfen für sich stehen (kein erklärender Satz unter jedem Kapitel).

## 8 · Notion-Quelle (Referenz)
Hauptseite „Henri Löhlein - UX/UI Design" (DE/EN), Datenbank „Meine Projekte". Erreichbar über den verbundenen Notion-Connector (Suche „Henri Löhlein UX/UI"). Englische Originalversionen der Projekte existieren dort ebenfalls.
