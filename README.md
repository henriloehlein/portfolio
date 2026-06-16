# Henri Löhlein — Portfolio Website

Eine vollumfängliche, kreative Portfolio-Website für **Henri Löhlein** (UX/UI Designer),
aufgebaut aus den Inhalten des verbundenen Notion-Portfolios. Statisch, ohne Build-Schritt,
ohne Framework — reines HTML/CSS/JS.

## Konzept

Das Design spiegelt den Charakter der Arbeit wider: die Schnittstelle von **Psychologie und
Design**. Leitmotiv ist die Frage „zwischen Unterstützung und Manipulation". Die visuelle
Signatur — ein warm/kühler Verlauf (Koralle → Amber → Pink → Indigo → Blau) — übernimmt
direkt das Gestaltungsprinzip aus dem Projekt *steady* (warme Akzente für Empathie, Blau für
Klarheit, Gradients als Alleinstellungsmerkmal).

## Struktur

```
portfolio/
├── index.html        # Inhalt aller Sektionen + verborgene Case-Study-Quellen
├── css/styles.css    # Design-System (dark-first, Theme-Variablen, Responsive)
├── js/main.js        # Preloader, Cursor, Reveal, i18n, Theme, Modals, Rotator
└── assets/img/       # Echte Screenshots aus dem Notion-Portfolio (10 Bilder)
```

## Sektionen

1. **Hero** — kinetischer Titel mit rotierendem Gradient-Wort, Verfügbarkeits-Badge
2. **Ansatz** — „Lösungen folgen Bedürfnissen; Bedürfnisse folgen Empathie; …"
3. **Fokus** — Nudging · Dark Patterns · Persuasive Design · Adaptive KI
4. **Arbeiten** — steady · Milo · Cognify · Syntegon (BA) · forwerts → volle Case Studies im Slide-in-Modal
5. **Prozess** — 5-stufige Arbeitsweise
6. **Über mich** — Psychologie & Design, Blick nach vorn, Interessen-Marquee
7. **Kontakt** — Mail, LinkedIn

## Features

- **Zweisprachig DE/EN** — Umschalter oben rechts (DE ist vollständig, EN für Navigation,
  Hero, Über-mich, Fokus & Projekt-Teaser; die tiefen Case-Study-Texte sind auf Deutsch)
- **Theme-Umschalter** hell/dunkel (Präferenz wird gespeichert)
- **Case-Study-Modals** mit vollständigem Notion-Inhalt + echten Screenshots
- **Custom Cursor**, magnetische Buttons, Scroll-Reveal, Parallax
- **Responsive** bis 375px, Burger-Menü, kein horizontales Overflow
- Respektiert `prefers-reduced-motion`

## Lokal ansehen

Beliebiger statischer Server, z. B.:

```bash
npx serve portfolio -l 4321
# dann http://localhost:4321
```

## Hinweise

- Die Bilder in `assets/img/` wurden aus den (ablaufenden) Notion-S3-URLs heruntergeladen
  und liegen nun lokal vor — die Seite ist damit vollständig eigenständig.
- Schriften (Fraunces, Inter, Space Grotesk) werden via Google Fonts geladen. Für komplette
  Offline-Fähigkeit könnten sie self-hosted werden.
- Inhaltsstand: Notion-Portfolio, Juni 2026.

© 2026 Henri Löhlein
