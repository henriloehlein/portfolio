# Archiv: Anekdoten-Karten „Woher mein Interesse kommt“

Entfernt am 2026-09-29 aus `denkweise-preview.html` (Abschnitt „Schwerpunkte“, unter den beiden Schwerpunkten). Die Preview-Datei ist per `.gitignore` nur lokal, deshalb steht der vollständige Code hier.

Zwei Flip-Karten: Vorderseite mit Kontext, Piktogramm und Frage, Rückseite mit der Geschichte. Auf dem Desktop drehen sie beim Hover, sonst per Tippen oder Enter/Leertaste; unter 1040px ohne 3D-Drehung, Tippen wechselt die Seite.

## HTML

```html
    <div class="an">
      <p class="an-label">Woher mein Interesse kommt</p>
      <div class="an-grid">
        <article class="acard" tabindex="0" role="button" aria-label="Karte umdrehen: Warum das Kreuz oben in der Ecke sitzt">
          <div class="acard__inner">
            <div class="acard__face acard__front">
              <span class="acard__ctx">Erster UX-Kurs</span>
              <svg class="acard__ico pv-ico" aria-hidden="true"><use href="#ico-ad"/></svg>
              <div class="acard__foot"><h3>Warum das Kreuz oben in der Ecke sitzt</h3><svg class="acard__turn" aria-hidden="true"><use href="#ico-turn"/></svg></div>
            </div>
            <div class="acard__face acard__back">
              <p>Eines der ersten Beispiele in meinem ersten UX-Kurs: Werbung auf dem Smartphone. Das Kreuz zum Schließen ist winzig und sitzt in einer oberen Ecke, weit weg vom Daumen. Das ist Absicht, denn je mühsamer das Schließen, desto eher landet ein Tipp auf der Werbung.</p>
              <p>Seitdem fallen mir solche Entscheidungen überall auf. Ich will verstehen, was dahintersteckt, um Dinge leichter zu machen statt schwerer.</p>
            </div>
          </div>
        </article>
        <article class="acard" tabindex="0" role="button" aria-label="Karte umdrehen: Warum kaum jemand wechselt">
          <div class="acard__inner">
            <div class="acard__face acard__front">
              <span class="acard__ctx">Apple-Ökosystem</span>
              <svg class="acard__ico pv-ico" aria-hidden="true"><use href="#ico-eco"/></svg>
              <div class="acard__foot"><h3>Warum kaum jemand wechselt</h3><svg class="acard__turn" aria-hidden="true"><use href="#ico-turn"/></svg></div>
            </div>
            <div class="acard__face acard__back">
              <p>Fast alle, die Apple-Geräte nutzen, sagen, sie könnten nicht mehr wechseln. Mich interessiert, woran das liegt: an Gesten, die sich selbstverständlich anfühlen, an Geräten, die nahtlos zusammenspielen, an vielen kleinen Details.</p>
              <p>Dort bleiben Menschen, weil sie es wollen. Genau diese Art von Begeisterung möchte ich gestalten.</p>
            </div>
          </div>
        </article>
      </div>
    </div>
```

## Symbole (in die `<defs>` des SVG-Sprites)

```html
    <symbol id="ico-ad" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="10" y="4" width="22" height="40" rx="4"/>
      <path d="M18 8h6"/>
      <rect style="stroke:var(--pv-acc)" x="13.5" y="12" width="15" height="19" rx="1.5"/>
      <path style="stroke:var(--pv-acc)" d="M24.4 14.6l2 2M26.4 14.6l-2 2"/>
      <path d="M17 36h8"/>
      <path stroke-dasharray="1.5 3.2" d="M45 45c-1-9-6-15-15-17"/>
    </g></symbol>
    <symbol id="ico-eco" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="17" width="26" height="17" rx="2"/>
      <path d="M1.5 38h31"/>
      <rect x="35" y="21" width="10" height="19" rx="2.5"/>
      <path d="M38.5 24h3"/>
      <path style="stroke:var(--pv-acc)" stroke-dasharray="1.5 3.2" d="M17 12c5-6 16-7 23 4"/>
      <circle style="stroke:var(--pv-acc)" cx="17" cy="12" r="1.2"/><circle style="stroke:var(--pv-acc)" cx="40" cy="16" r="1.2"/>
    </g></symbol>
    <symbol id="ico-turn" viewBox="0 0 16 16"><g fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12.5 6.5A5 5 0 1 0 13 10"/><path d="M13 3.5v3h-3"/>
    </g></symbol>
```

## CSS

```css
/* ---------- Anekdoten: Flip-Karten als leiser Zusatz ---------- */
.an{margin-top:clamp(100px,12vw,160px)}
.an-label{display:flex;align-items:center;gap:14px;margin-bottom:24px;font-family:var(--f-mono);font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.an-label::before{content:"";width:28px;height:1px;background:var(--line-2)}
.an-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
.acard{--r:18px;perspective:1600px;height:clamp(240px,19vw,268px);border-radius:var(--r);cursor:pointer;outline:none}
.acard:focus-visible{outline:2px solid var(--warm-1);outline-offset:6px}
.acard__inner{position:relative;height:100%;transform-style:preserve-3d;transition:transform .85s var(--ease)}
.acard.is-flipped .acard__inner{transform:rotateY(180deg)}
@media (hover:hover){.acard:hover .acard__inner{transform:rotateY(180deg)}}
.acard__face{position:absolute;inset:0;display:flex;flex-direction:column;padding:clamp(22px,2.2vw,30px);border-radius:var(--r);overflow:hidden;
  -webkit-backface-visibility:hidden;backface-visibility:hidden;
  background:linear-gradient(180deg,color-mix(in srgb,#fff 5%,transparent),transparent 55%),color-mix(in srgb,var(--surface) 34%,transparent);
  box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--text) 10%,transparent),inset 0 1px 0 color-mix(in srgb,#fff 9%,transparent);
  -webkit-backdrop-filter:blur(var(--glass-blur));backdrop-filter:blur(var(--glass-blur))}
.acard__ctx{font-family:var(--f-mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.acard__ico{position:absolute;top:clamp(18px,1.8vw,26px);right:clamp(18px,1.8vw,26px);width:clamp(72px,7vw,96px);height:clamp(72px,7vw,96px);opacity:.7;transition:transform .8s var(--ease),opacity .5s}
.acard:hover .acard__ico{opacity:1;transform:translateY(-2px)}
.acard__foot{margin-top:auto;display:flex;align-items:flex-end;justify-content:space-between;gap:20px}
.acard__front h3{font-size:clamp(21px,1.8vw,25px);line-height:1.14;max-width:16ch}
.acard__turn{flex:none;width:32px;height:32px;padding:8px;border-radius:50%;box-shadow:inset 0 0 0 1px var(--line-2);color:var(--muted);transition:transform .6s var(--ease),color .3s}
.acard:hover .acard__turn{transform:rotate(-140deg);color:var(--text)}
.acard__back{transform:rotateY(180deg);justify-content:center;gap:10px;
  background:radial-gradient(120% 90% at 100% 0%,color-mix(in srgb,var(--warm-1) 16%,transparent),transparent 60%),color-mix(in srgb,var(--surface) 62%,transparent)}
.acard__back p{font-size:14.5px;line-height:1.62;color:var(--muted);max-width:60ch;text-wrap:pretty}
.acard__back p:last-child{color:var(--text)}
/* in @media (prefers-reduced-motion:reduce) */
  .acard__inner{transition:none}
/* in @media (max-width:1040px) */
  .an-grid{grid-template-columns:1fr}
  /* ohne Drehung: Tippen wechselt zwischen Vorder- und Rückseite */
  .acard{perspective:none;height:auto}
  .acard__inner{transform:none!important;display:grid}
  .acard__face{position:relative;inset:auto;min-height:230px;-webkit-backface-visibility:visible;backface-visibility:visible}
  .acard__back{transform:none;display:none}
  .acard.is-flipped .acard__front{display:none}
  .acard.is-flipped .acard__back{display:flex}
```

## JS

```js
  // Flip-Karten: Hover dreht auf dem Desktop, Tippen und Enter/Leertaste überall
  document.querySelectorAll('.acard').forEach(c => {
    c.addEventListener('click', () => c.classList.toggle('is-flipped'));
    c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); c.classList.toggle('is-flipped'); } });
  });
```
