# Henri Löhlein — Portfolio Website

Eine vollumfängliche, kreative Portfolio-Website für **Henri Löhlein** (UX/UI Designer),
aufgebaut aus den Inhalten des Notion-Portfolios und des Lebenslaufs. Statisch, ohne
Build-Schritt, ohne Framework, reines HTML/CSS/JS.

## Konzept

Das Design spiegelt den Charakter der Arbeit wider: die Schnittstelle von **Psychologie und
Design**, mit Betonung auf KI, LLMs und adaptive Systeme. Leitmotiv ist die Frage „zwischen
Unterstützung und Manipulation". Die visuelle Signatur, ein warm/kühler Verlauf
(Koralle → Amber → Pink → Indigo → Blau), übernimmt direkt das Gestaltungsprinzip aus dem
Projekt *steady* (warme Akzente für Empathie, Blau für Klarheit, Gradients als
Alleinstellungsmerkmal).

## Struktur

```
portfolio/
├── index.html            # Inhalt aller Sektionen + verborgene Case-Study-Quellen (#cases)
├── css/styles.css        # Design-System (dark-first, Theme-Variablen, Responsive)
├── js/main.js            # Preloader, Cursor, Reveal, i18n, Theme, Modals, Blasen, Skills-Orbit
├── assets/img/           # Case-Study-Screenshots (Personas, Journeys, Screens)
└── assets/img/covers/    # Cover-Bilder für Header & Arbeiten (portrait, steady, milo, …)
```

Henris Quell-Ordner `Bilder/` und der Lebenslauf (`Lebenslauf_*.pdf`) liegen lokal vor, sind
aber per `.gitignore` ausgeschlossen und werden **nicht** veröffentlicht (Datenschutz). Die
Website nutzt ausschließlich die sauberen Kopien in `assets/img/covers/`.

## Seitenaufbau

1. **Top-Bar** minimal: DE/EN-Umschalter + Theme-Toggle (hell/dunkel)
2. **Header-Streifen** über die volle Breite: Porträt mittig (neutral verarbeitet), Cover-Bilder
   der Arbeiten links und rechts, darunter Name und Affiliation (Bachelorand bei Syntegon,
   Hochschule Ansbach)
3. **Sektionsleiste** (randlos, horizontal gestreckt, sticky): Ansatz · Interessen · Arbeiten ·
   Über mich · Kontakt
4. **Opening** „Design an der Grenze": persönliche Vorstellung (Psychologie × Technologie,
   Neugier auf die Zukunft) kombiniert mit der Haltung/Manifesto-Kette
5. **Interessen**: vier Flip-Cards (Nudging, Dark Patterns, Persuasive Design, Adaptive KI) plus
   ein Skills-Orbit aus den Fähigkeiten und Werkzeugen des Lebenslaufs
6. **Arbeiten**: steady · Milo · Cognify · Syntegon (Bachelorarbeit) · forwerts, je mit Cover,
   Klick öffnet die vollständige Case Study im Slide-in-Modal
7. **Über mich** (inkl. Methode) und **Kontakt**

## Features

- **Schwebende Projekt-Blasen**: realistische Seifenblasen mit den Projekt-Covern treiben in den
  seitlichen Rändern, wrappen über den Bildschirmrand (links raus, rechts rein) und führen per
  Vorschau in die jeweilige Case Study
- **Zweisprachig DE/EN** über den Umschalter oben rechts
- **Theme-Umschalter** hell/dunkel (Präferenz wird gespeichert)
- **Case-Study-Modals** mit vollständigem Inhalt und echten Screenshots
- **Custom Cursor**, magnetische Buttons, Scroll-Reveal, Skills-Physik
- **Responsive** bis 375 px, kein horizontales Overflow
- Respektiert `prefers-reduced-motion`

## Lokal ansehen

Beliebiger statischer Server, z. B.:

```bash
npx serve portfolio -l 4321
# dann http://localhost:4321
```

## Hinweise

- Schriften (Fraunces, Inter, Space Grotesk) werden via Google Fonts geladen. Für komplette
  Offline-Fähigkeit könnten sie self-hosted werden.
- Deployment und der aktuelle Arbeitsstand stehen in `PROJEKT-STATUS.md` (Handoff-Datei mit
  Warteschlange der nächsten Aufgaben).
- Inhaltsstand: Notion-Portfolio und Lebenslauf, Juni 2026.

© 2026 Henri Löhlein
