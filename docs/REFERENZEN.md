# Referenzen — Handwerkswissen aus vier Vorbild-Portfolios

> **Herkunft:** destilliert aus einer Recherche zu vier Portfolios, die Henri ausgewählt und
> bewertet hat (`perryw-2023.webflow.io`, `sreedesigns.com`, `hasque.com`, `austinknight.com`,
> Anti-Referenz). Alle Werte sind aus dem echten CSS ausgelesen, nicht geschätzt. Diese Fassung ist
> bewusst allgemein gehalten — ursprünglich für „Portfolio v3" (eigenes Repo, eigene
> Glas-Bedientafel-Designsprache) aufbereitet, hier auf das reduziert, was projektunabhängig
> nutzbar ist. Keine Kopiervorlage, sondern Startpunkt zum Übernehmen oder Verbessern.

---

## Die eigentliche Erkenntnis

„Hochwertig" entsteht **nicht durch einen großen Effekt**, sondern durch viele sehr kleine,
konsistente Handwerksentscheidungen. Das ist der Befund aus allen vier Referenzen.

| # | Muster | Belegt in |
|---|---|---|
| 1 | Display-Schrift mit Charakter + neutrale Body-Schrift | 4/4 |
| 2 | Nie reines Schwarz, nie reines Weiß | 4/4 |
| 3 | Hierarchie über Alpha-Stufen **einer** Farbe, nicht über neue Farben | 4/4 |
| 4 | Negatives Letter-Spacing auf Display, positives auf Labels | 4/4 |
| 5 | Schatten gestapelt, nie einlagig | 4/4 |
| 6 | Tightes Display-Line-Height (0.90–1.17) | 4/4 |
| 7 | easeOut, 0.2–0.6 s, nur `transform` und `opacity` | 4/4 |
| 8 | Große Radien auf Medien, kleine auf Steuerelementen | 4/4 |
| 9 | Glare-/Lichtkanten auf Materialflächen | perryw, austinknight |
| 10 | Glas mit `backdrop-filter` | 4/4 |
| 11 | Bewegtes Video statt Screenshot in Projekten | hasque, sreedesigns |
| 12 | Serif-Italic-Akzentwort in der Headline | hasque, perryw |

Punkte 1–8 sind gut reproduzierbar und tragen den Großteil der Wirkung.

---

## Prinzipien

### P1 — Ein Fokus-Element pro Viewport

Kritik am dichtesten Referenzbeispiel: „Der bewegende Gradient, diese große interaktive Komponente
und die Animationen gleichzeitig ist etwas zu viel."

Pro Bildschirmausschnitt trägt **genau ein** Element Aufmerksamkeit. Als Budget:

| Kategorie | Erlaubt pro Viewport |
|---|---|
| Bewegter Hintergrund | max. 1 — und nur, wenn sonst nichts im Viewport sich bewegt |
| Große interaktive Komponente | max. 1 |
| Auto-laufende Video-/Motion-Fläche | max. 1 prominent |
| **Summe lauter Elemente** | **1** |

Praktisch für einen Hero: entweder bewegter Hintergrund *oder* große interaktive Komponente, nicht
beides gleichzeitig.

### P2 — Jede präsente Schrift bekommt einen Effekt, aber subtil

„Jede präsente Schrift hat einen Schatten, Glow, Gradient oder einen Effekt oder ähnliches, aber es
ist nicht zu dick aufgetragen, es passt zum Theme und es wirkt einfach gut."

- Nur **präsente** Schrift (H1, H2, Projekt-Titel). Fließtext nie.
- Deckkraft unter **0.3 pro Layer**.
- Immer gestapelt (2–3 Layer), nie ein einzelner harter Schatten.
- Gegenläufige Lichtrichtungen statt eines neutralen Scheins — das ist der Unterschied zu „billig".

### P3 — Nie reines Schwarz, nie reines Weiß

| Referenz | Textfarbe | Hintergrund |
|---|---|---|
| `perryw` | `#F2F2F2` | `#101010` |
| `sreedesigns` | `rgb(27,76,120)` — dunkelblau, kein Schwarz | Weiß + Blau-Verlauf |
| `austinknight` | `rgba(0,0,0,0.6)` | `#D9D9D9` |
| `hasque` | `#FFF` | `#0D0D0D` |

Reines `#000` / `#FFF` ist ein Amateur-Signal.

### P4 — Hierarchie über Deckkraft, nicht über neue Farben

```
1.00  Primär   (Headline, Projekt-Titel)
0.72  Sekundär (Fließtext)
0.55  Tertiär  (Meta, Tags, Jahre)
0.40  Quartär  (Deko, Hinweise)
```

Keine zweite Grauskala erfinden. Eine Farbe, vier Stufen.

### P5 — Letter-Spacing: negativ groß, positiv klein

Das verlässlichste Handwerkssignal überhaupt — bei allen vier identisch.

| Größe | Letter-Spacing | Gemessen |
|---|---|---|
| Display 88–110 px | **negativ**, −0.02 bis −0.04em | −4.4px@110, −2.2px@96, −1.76px@88 |
| Body 14–20 px | ~0 bis leicht negativ | −0.32px@16, −0.6px@20 |
| Label/Mono 9–12 px | **positiv**, +0.06 bis +0.17em | +1.5px@9, +0.96px@12 |

Große Schrift wird zusammengezogen, kleine Labels werden gesperrt. Nie umgekehrt.

### P6 — Line-Height auf Display sehr tight

Gemessen: `sreedesigns` 110/99 = **0.90** · `sreedesigns` H2 60/60 = **1.00** · `hasque` 106/124 =
1.17. **Display 0.90–1.05, Body 1.3–1.5, Display nie über 1.2.**

### P7 — Schatten immer gestapelt, nie flach

Kein einziger Schatten in den Referenzen ist einlagig.

```css
box-shadow:
  inset 0 0 8px rgba(0,0,0,.4),   /* innere Kantenabdunklung */
  0 0 60px rgba(0,0,0,.2),        /* nahes Umgebungslicht    */
  0 30px 120px rgba(0,0,0,.8);    /* weit gestreuter Abwurf  */
```

**2–4 Layer:** ein kleiner scharfer (Kontakt) plus ein großer weicher (Umgebung), optional `inset`
für Materialität.

### P8 — Motion: easeOut, 0.2–0.6 s, nur transform + opacity

```css
--ease:      cubic-bezier(0.165, 0.84, 0.44, 1);  /* easeOutQuart */
--ease-slow: cubic-bezier(0.23, 1, 0.32, 1);      /* easeOutQuint */
```

Gemessene Dauern: 0.2 s (Hover) · 0.25–0.3 s (Reveal) · 0.4–0.6 s (Layout) · 1 s (nur Schatten).

Reveal = `translateY(16–24px)` + `opacity 0→1`, gestaffelt mit 60–80 ms. Kein Dauer-Loop außer
maximal einem Element. `prefers-reduced-motion` respektieren.

### P9 — Radius: groß auf Medien, klein auf Steuerelementen

Gemessen: `hasque` 44 px (Projekt-Boxen) · `sreedesigns` 62.8 px · `austinknight` 40 px (Nav-Pill)
— gleichzeitig aber 2/3/8–10 px auf kleinen Elementen. Der Kontrast zwischen sehr groß und sehr
klein ist Absicht, keine Einheits-Rundung.

### P10 — Motion in Projekten statt Screenshots

`hasque` hat 5 Videos (`autoplay`+`loop`+`muted`) in Geräte-Mockups, `sreedesigns` 2 Videos +
4 Canvas. Immer `muted`, `loop`, `playsinline`, `preload="metadata"` — und **erst abspielen, wenn
im Viewport** (IntersectionObserver), sonst verbrennt es Performance und verstößt gegen P1.

### P11 — Die eine echte Falle: der Template-Hero

Kritik an der Anti-Referenz: „etwas generisch und wirkt vibe codet."

Der verlässlichste Weg in generische Wirkung ist die Template-Antwort: große Zahl + kleines Label +
Gradient-Akzent, oder ein zentrierter Fließtext-Hero ohne eigene Idee. Kommt der Hero aus der
tatsächlichen Arbeit und Fachwelt, ist die Falle umgangen.

### P12 — Wirkung wird belegt, nicht behauptet

Alle Referenzen quantifizieren oder nennen Namen: „Raised \$1,000,000 from Samsung & Chapter One" ·
„100k+ monthly page views" · „Giving a second life to over a million controllers" · „2M+ downloads".

**Format pro Projekt:** `Kontext, Jahr — Wirkung in einem Satz`. Keine Aufgabenbeschreibung ohne
Ergebnis. Wo keine belegbare Zahl existiert, erklärt der Mechanismus die Wirkung — Zahlen erfinden
ist immer ausgeschlossen.

### P13 — Die drei Informationsschichten

Alle vier Referenzen bedienen genau drei:

| Schicht | Inhalt | Funktion |
|---|---|---|
| **1. Thesis** | Headline + Rolle + Referenzen | Positionierung in 3 Sekunden |
| **2. Beweis** | Projekte, groß und modular, mit Wirkung | „Der kann was" |
| **3. Neugier-Ebene** | Craft / Play / Tools / Arbeitsweise | Tiefe, Persönlichkeit, Gesprächsanlass |

Schicht 3 ist der Grund, warum die Referenzen nicht wie Lebensläufe wirken.

---

## Effekt-Rezepte

Ausgelesener Code, kein geschätzter.

### R1 — Chromatischer Text-Glow ⭐

`perryw`, Headline 96 px:

```css
.hero-title {
  text-shadow:
    rgba(0,  87, 255, .15)  0  5px 10px,   /* kühl, von unten      */
    rgba(255, 90,   0, .10)  0 -5px 10px,   /* warm, von oben       */
    rgba(255,255,255, .30)  0 -5px 25px;   /* weißer Diffus-Schein */
}
.project-title { text-shadow: rgba(255,255,255,.2) 0 -2px 10px; }  /* deutlich sparsamer */
```

**Warum es funktioniert:** Zwei komplementäre Farben aus entgegengesetzten Richtungen simulieren
Licht aus zwei Quellen. Das Auge liest Tiefe, ohne „Effekt" zu erkennen. Ein einzelner weißer Glow
wirkt dagegen billig.

### R2 — Glare-Kante ⭐

`perryw`. Eine 1 px hohe Lichtlinie an der Oberkante, als fiele Licht auf eine Materialkante.
Extrem wirksam, kaum bemerkbar.

```css
.glare-top {
  position: absolute; inset: 0 0 auto 0; height: 1px;
  background: linear-gradient(to right, transparent 10%, #fff 50%, transparent 90%);
}
/* weichere Flanken */
.glare-top--soft {
  background: linear-gradient(to right, transparent 5%, rgba(255,255,255,.8) 35%,
              #fff 50%, rgba(255,255,255,.8) 65%, transparent 95%);
}
```

**Einsatz:** Oberkante von Karten, Nav-Pills, Mockups, Glasflächen. Sparsam einsetzen — auf jeder
Fläche wird aus einer Signatur ein Muster.

### R3 — Noise-Textur

`austinknight` kachelt eine Noise-PNG über den Hintergrund und nimmt dem Verlauf das Digitale.
Als SVG-Filter, ohne Asset:

```css
.noise::after {
  content:""; position:absolute; inset:0; pointer-events:none;
  opacity:.035; mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

Auf hellem Grund `soft-light` statt `overlay` verwenden. Nicht animieren.

### R4 — Stagger-Reveal von unten

```css
.reveal { opacity:0; transform:translateY(20px);
          transition:opacity .3s var(--ease), transform .3s var(--ease);
          transition-delay: calc(var(--i,0) * 70ms); }
.reveal.in { opacity:1; transform:none; }

@media (prefers-reduced-motion:reduce){
  .reveal{ transform:none; transition:opacity .2s linear; }
}
```

Am robustesten hinter einem `html.js`-Gate (per `is:inline`-Script im `<head>`, vor dem ersten
Paint), damit ohne JS nichts unsichtbar bleibt.

### R5 — Fenster-Mockup (macOS-Look)

`perryw`, vollständige Rezeptur:

```css
.window-outline {
  border-radius: 16px 16px 0 0;
  background: radial-gradient(circle farthest-side at 50% 0, rgba(242,242,242,.2), transparent);
  box-shadow: inset 0 0 8px rgba(0,0,0,.4), 0 0 60px rgba(0,0,0,.2), 0 30px 120px rgba(0,0,0,.8);
}
.window-bar {   /* metallischer Querverlauf */
  background: linear-gradient(to right,
    rgba(242,242,242,.1), rgba(242,242,242,.5) 50%, rgba(242,242,242,.1));
  box-shadow: 0 10px 20px 4px rgba(0,0,0,.2);
}
.dot.red    { box-shadow: 0 0 20px 2px rgb(244,107, 93); }   /* farbiges Eigenglühen */
.dot.yellow { box-shadow: 0 0 20px 2px rgb(249,189, 78); }
.dot.green  { box-shadow: 0 0 20px 2px rgb( 87,195, 83); }
```

Guter Kandidat für Case-Study-Seiten mit Screen-Mockups.

### R6 — Text mit Verlaufs-Ausblendung

```css
.text-fade {
  background: linear-gradient(#F2F2F2 50%, transparent 90%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; color: transparent;
}
```

Erklärt den „Glass-Optik"-Eindruck der Schrift bei `perryw`. Kombinierbar mit R1 — **aber testen:**
in manchen Browsern schluckt der Clip den `text-shadow`; Fallback ist der Glow auf einem
Pseudo-Element.

### R7 — Hero-Lichtkegel von oben

```css
.hero { background: radial-gradient(circle closest-corner at 50% 0, rgba(242,242,242,.15), transparent); }
```

Bühnenlicht über der Headline. Sehr günstig, sehr wirksam, **bewegt sich nicht** — daher mit P1
verträglich.

### R8 — Glas mit farbigem Streiflicht

`sreedesigns` — das ist dort die „Glass-Optik":

```css
.glass {
  backdrop-filter: blur(8px);
  background: linear-gradient(115deg,
    transparent 30%,
    rgba(255,255,255,.20) 44%,
    rgba(186,168,255,.10),   /* violettes Streiflicht */
    transparent 64%,
    rgba(6,16,36,.30));      /* dunkler Gegenpol      */
  box-shadow: 0 12px 32px rgba(0,0,0,.12);
}
```

Der 115°-Winkel und der violette Zwischenton machen den Unterschied zu simplem `rgba`-Weiß.

### R9 — Sektions-Übergang

```css
.section-fade { background: linear-gradient(rgba(16,16,16,0), #101010 60%); }
```

Verhindert harte Sektionskanten.

### R10 — Foto-Rahmen (Polaroid)

```css
.photo { box-shadow: 0 0 0 8px rgba(255,255,255,.25), 12px 16px 16px rgba(0,0,0,.1); }
```

---

## Die vier Referenzen einzeln

### `perryw-2023.webflow.io` — die Effekt-Referenz ⭐

BG `#101010` · Text `#F2F2F2` / `rgba(242,242,242,.5)` · Neue Montreal + Gloock Italic · H1 96 px,
LS −2.2 px · Easing `cubic-bezier(.165,.84,.44,1)`, 0.2–0.6 s · `backdrop-filter` 5/15/20/40 px ·
Radien 2/3/10/16/18/24/100/2000 px.

Technisch sauberste und am besten übertragbare Referenz für Effekte und Motion.

### `sreedesigns.com` — die Struktur-Referenz ⭐

BG Weiß + mehrstufiger Blau-Verlauf · **monochrom:** Text `rgb(27,76,120)` bei 1.0/0.72/0.55,
kein Schwarz · Meraki + Geist + Geist Mono · Display 110 px / LH 99 px (0.90) / LS −4.4 px ·
`backdrop-filter` 6/8 px · Radius 62.8 px · Nav mit eckigen Klammern `[ About ]`, `↳ Let's Talk`.

Sektionsfolge: Hero → Work → Craft → Play → Tools I Use → Testimonials (001/004) →
Technology/Business/Culture.

### `hasque.com` — Klarheit und Modularität

BG `#0D0D0D` · PP Mori + PP Editorial New Italic · H1 106 px / LH 124 px · Radius **44 px** ·
5 Videos (`autoplay`+`loop`). Struktur: Hero (Headline links + interaktive Komponente rechts) →
Meta-Zeile → 4 Projekte → Experiments 08→01 (nummerierte Neugier-Ebene, Schicht 3).

### `austinknight.com` — Anti-Referenz

BG `#D9D9D9` + Radial-Verlauf + Noise-PNG · Instrument Serif + Inter Display · Text
`rgba(0,0,0,.6)` · Hero 88 px, LS −1.76 px, Blur-In-Reveal · Glass-Nav-Pill (`blur(5px)`,
Radius 40 px).

**Was hier nicht funktioniert:** zentrierter Hero ohne eigene Idee · Blur-In-Reveal (verzögert die
Lesbarkeit) · sehr lange unverdichtete Listen. Urteil: „etwas generisch und wirkt vibe codet." Das
ist die Wirkung, die es zu vermeiden gilt.
