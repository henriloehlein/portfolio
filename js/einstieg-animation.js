/* =========================================================
   Einstieg-Animation · Bühne und Ablauf
   Canvas-Größe, Kamera, Schleife, Pause, reduzierte Bewegung
   und Theme-Wechsel. Braucht einstieg-szene.js und
   einstieg-zeichnen.js.

   Layouts:
   full     breites Band, Kamera folgt (A, C) oder feste Bühne (B)
   compact  kleines Fenster, Kamera folgt (z. B. im Kopf)
   window   nur ein Ausschnitt ist sichtbar; er wandert mit der
            Person über die Breite, rechts hinaus und links herein
   ========================================================= */
(function () {
  'use strict';
  const Z = window.EinstiegSzene, R = window.EinstiegZeichnen;
  const { clamp, lerp, sm, wrap, V_WALK } = Z;
  const OMEGA = 2.4;
  // Stile D bis F bauen auf A auf und ergänzen einzelne Details.
  const BASE = { d: 'a', e: 'a', f: 'a', g: 'a', h: 'a', i: 'c' };
  const FX = {
    d: { detail: 1, solid: 1, cards: 1 },
    e: { detail: 1, solid: 1, cards: 1, extrude: 1, turn: 1 },
    f: { detail: 1, solid: 1, cards: 1, extrude: 1, material: 1, coat: 1 },
    g: {},
    h: { quiet: 1 },            // Linie leise: transparenter, tritt hinter die Projekte zurück
    i: { fine: 1 },             // Raster fein: kleinere Punkte, Linien etwas kräftiger
  };
  // Sichtbarer Szenenbereich in Welt-Einheiten: volle Höhe oder eng beschnitten.
  const FRAME = { full: { h: 330, g: 290 }, tight: { h: 232, g: 222 }, line: { h: 226, g: 226 } };

  class Stage {
    constructor(root, opts) {
      if (typeof opts === 'string') opts = { style: opts };
      this.o = Object.assign({ style: 'a', layout: 'full', frame: null, winW: 440, bub: 1, ground: true }, opts);
      this.root = root;
      this.canvas = root.querySelector('.ia__canvas');
      this.ctx = this.canvas.getContext('2d');
      this.layer = document.createElement('canvas');
      this.lctx = this.layer.getContext('2d');
      this.grid = document.createElement('canvas');
      this.gctx = this.grid.getContext('2d', { willReadFrequently: true });
      this.btn = root.querySelector('.ia__toggle');
      this.blurs = root.querySelectorAll('.ia__blur');
      this.T = null; this.visible = true; this.raf = 0;
      this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.userPaused = this.reduced;
      this.th = R.readTheme();
      this.tick = this.tick.bind(this);
      this.resize();

      new ResizeObserver(() => { this.resize(); this.render(); }).observe(root);
      new IntersectionObserver(es => { this.visible = es[0].isIntersecting; this.sync(); }).observe(root);
      document.addEventListener('visibilitychange', () => this.sync());
      new MutationObserver(() => { this.th = R.readTheme(); this.render(); })
        .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      if (this.btn) this.btn.addEventListener('click', () => { this.userPaused = !this.userPaused; this.sync(); });

      const start = () => { root.classList.add('is-ready'); this.render(); this.sync(); };
      (document.fonts && document.fonts.load ? Promise.race([document.fonts.load('italic 400 24px Fraunces'), new Promise(r => setTimeout(r, 1200))]) : Promise.resolve()).then(start, start);
    }

    get kind() { return this.o.style; }
    setVariant(v) { this.set({ style: v }); }
    set(opts) {
      const frac = this.S ? wrap(this.T, this.S.P) / this.S.P : null;
      Object.assign(this.o, opts); this.root.dataset.variant = this.o.style;
      this.resize(frac); this.render();
    }

    resize(frac) {
      const r = this.root.getBoundingClientRect();
      const w = Math.max(1, r.width), h = Math.max(1, r.height);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (frac == null && this.S) frac = wrap(this.T, this.S.P) / this.S.P;
      this.cssW = w; this.cssH = h; this.dpr = dpr;
      for (const c of [this.canvas, this.layer]) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
      const f = FRAME[this.o.frame || (this.o.layout === 'full' ? 'full' : 'tight')];
      this.viewH = f.h; this.scale = h / this.viewH; this.ground = f.g - (this.o.liftPx || 0) / this.scale;
      this.scale = h / this.viewH; this.viewW = w / this.scale;

      const L = this.o.layout;
      if (L === 'full' && this.kind === 'b' && this.viewW >= 980) this.mode = 'fixed';
      else if (L === 'window' && this.viewW * (1 - (this.o.zone || 0)) >= this.o.winW * 2.1) this.mode = 'window';
      else this.mode = 'track';
      if (this.mode === 'fixed') this.S = Z.buildScript([.24, .5, .76].map(f => f * this.viewW), this.viewW);
      else if (this.mode === 'window') {
        // Stationen bei einem Fünftel, der Mitte und vier Fünfteln der Breite.
        const z = this.o.zone || 0;
        this.S = Z.buildScript([.2, .5, .8].map(f => (z + f * (1 - z)) * this.viewW), this.viewW);
      } else { const D = 620; this.S = Z.buildScript([0, D, 2 * D], 3 * D); }

      const fine = this.kind === 'i';
      if (this.kind === 'c' || this.kind === 'g' || fine) {
        this.cell = fine ? clamp(h / 84, 1.7, 3.4) : clamp(h / 64, 2.6, w < 700 ? 4.5 : 5.5);
        this.gw = Math.ceil(w / this.cell); this.gh = Math.ceil(h / this.cell);
        this.grid.width = this.gw; this.grid.height = this.gh;
        const fade = this.o.layout !== 'full' ? 1 : this.fadePx();
        this.ex = Float32Array.from({ length: this.gw }, (_, i) => { const x = (i + .5) * this.cell; return sm(x / fade) * sm((w - x) / fade); });
        const top = Math.min(18, h * .12);
        this.ey = Float32Array.from({ length: this.gh }, (_, j) => { const y = (j + .5) * this.cell; return sm(y / top) * (this.o.frame === 'line' ? 1 : sm((h - y) / top)); });
      }
      // Standbild bei reduzierter Bewegung: Gestaltung, kurz vor dem Tippen
      if (this.T == null) this.T = this.reduced ? this.S.D.arrive + 3.2 : this.S.R.arrive - 2.6;
      else if (frac != null) this.T = frac * this.S.P;
      this.sc = Z.scene(this.S, this.T);
      this.camC = this.camTarget(); this.camV = 0;
      this.root.classList.toggle('is-window', this.mode === 'window');
      // Außerhalb der breiten Fassung übernimmt feather() die Unschärfe im Canvas.
      this.blurs.forEach(b => { b.style.display = this.o.layout === 'full' ? '' : 'none'; });
      this.canvas.style.opacity = this.kind === 'h' ? '.5' : '';
    }
    fadePx() { const b = this.blurs[0]; return b ? b.getBoundingClientRect().width || 120 : 120; }

    camTarget() {
      const k = this.sc.k;
      const lead = this.mode === 'window' ? 0 : this.viewW * .08;
      const walk = k.x + lead + 2 * V_WALK / OMEGA * k.w;
      return lerp(Z.focusOf(this.sc), walk, k.w);
    }

    // Für die Vorschau: an eine Stelle springen (Sekunden relativ zur Ankunft an r, c oder d).
    seek(id, u) {
      this.T = this.S[id.toUpperCase()].arrive + u + Math.floor(this.T / this.S.P) * this.S.P;
      this.sc = Z.scene(this.S, this.T); this.camC = this.camTarget(); this.camV = 0; this.render();
    }

    playing() { return !this.userPaused && this.visible && !document.hidden; }
    sync() {
      if (this.btn) {
        this.btn.classList.toggle('is-paused', this.userPaused);
        const en = document.documentElement.lang === 'en';
        this.btn.setAttribute('aria-label', this.userPaused ? (en ? 'Play animation' : 'Animation abspielen') : (en ? 'Pause animation' : 'Animation pausieren'));
      }
      if (this.playing() && !this.raf) { this.last = 0; this.raf = requestAnimationFrame(this.tick); }
      if (!this.playing() && this.raf) { cancelAnimationFrame(this.raf); this.raf = 0; }
    }
    tick(now) {
      this.raf = requestAnimationFrame(this.tick);
      const dt = this.last ? Math.min(.05, (now - this.last) / 1000) : 1 / 60;
      this.last = now;
      this.T += dt;
      if (this.strokeOld > 0) this.strokeOld = Math.max(0, this.strokeOld - dt / 1.6);
      this.sc = Z.scene(this.S, this.T);
      if (this.mode !== 'fixed') {
        const a = OMEGA * OMEGA * (this.camTarget() - this.camC) - 2 * OMEGA * this.camV;
        this.camV += a * dt; this.camC += this.camV * dt;
      }
      this.render();
    }

    /* ---------- Zeichenumgebung ---------- */
    env(ctx, hair, force) {
      const self = this, th = this.th, K = force || this.kind, C = K === 'c' || K === 'i';
      const camX = this.mode === 'track' ? this.camC - this.viewW / 2 : 0;
      return {
        ctx, th, kind: force || BASE[this.kind] || this.kind, fx: force ? {} : FX[this.kind] || {}, hair, T: this.T, dpr: this.dpr, viewW: this.viewW, left: camX, camX,
        bub: this.o.bub, ground: this.o.ground,
        ink: a => (C ? `rgb(${clamp(a, 0, 1) * 255 | 0},0,0)` : R.rgba(th.text, a)),
        acc: a => (C ? `rgb(0,${clamp(a, 0, 1) * 255 | 0},0)` : R.rgba(th.accent, a)),
        place(x, fn) {
          if (self.mode === 'track') { fn(); return; }
          const Lw = self.S.Lw, base = wrap(x, Lw) - x;
          for (let k = -1; k <= 1; k++) {
            const off = base + k * Lw, sx = x + off;
            if (sx < -220 || sx > self.viewW + 220) continue;
            ctx.save(); ctx.translate(off, 0); fn(); ctx.restore();
          }
        },
        alpha(a, box, fn) {
          if (a <= .004) return;
          if (C || a >= .996) { ctx.save(); ctx.globalAlpha *= a; fn(ctx); ctx.restore(); return; }
          const m = ctx.getTransform();
          const xs = [], ys = [];
          for (const [x, y] of [[box[0], box[1]], [box[2], box[1]], [box[0], box[3]], [box[2], box[3]]]) { xs.push(m.a * x + m.c * y + m.e); ys.push(m.b * x + m.d * y + m.f); }
          const x0 = clamp(Math.floor(Math.min(...xs)) - 4, 0, self.layer.width), x1 = clamp(Math.ceil(Math.max(...xs)) + 4, 0, self.layer.width);
          const y0 = clamp(Math.floor(Math.min(...ys)) - 4, 0, self.layer.height), y1 = clamp(Math.ceil(Math.max(...ys)) + 4, 0, self.layer.height);
          if (x1 - x0 < 1 || y1 - y0 < 1) return;
          const L = self.lctx;
          L.setTransform(1, 0, 0, 1, 0, 0); L.clearRect(x0, y0, x1 - x0, y1 - y0);
          L.setTransform(m); L.save(); fn(L); L.restore();
          ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a;
          ctx.drawImage(self.layer, x0, y0, x1 - x0, y1 - y0, x0, y0, x1 - x0, y1 - y0); ctx.restore();
        },
      };
    }

    render() {
      if (!this.sc) return;
      if (this.kind === 'c' || this.kind === 'i') this.renderRaster(true, null);
      else {
        const ctx = this.ctx, s = this.scale * this.dpr;
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const g = this.env(ctx, 1.25 / this.scale);
        if (this.kind === 'g') g.part = 'env';          // G: Umgebung als Linie, Figuren folgen als Raster
        ctx.setTransform(s, 0, 0, -s, 0, s * this.ground);
        ctx.translate(-g.camX, 0);
        R.drawScene(g, this.sc);
        if (this.kind === 'g') this.renderRaster(false, 'fig');
      }
      if (this.o.layout !== 'full') this.feather();
      if (this.o.stroke) this.drawStroke();
    }

    // Weicher Ausschnitt: innen scharf, zum Rand hin zunehmend unscharf und
    // transparent. Die Unschärfe liegt im Canvas selbst, damit keine Kanten
    // von Blur-Flächen sichtbar werden. Im Wander-Modus doppelt für den Umlauf.
    feather() {
      const ctx = this.ctx, W = this.canvas.width, H = this.canvas.height, k = this.scale * this.dpr;
      let wins, zf = 1;
      if (this.mode === 'window') {
        const Lw = this.S.Lw, cx = wrap(this.camC, Lw) * k, half = this.o.winW / 2 * k;
        wins = [cx - Lw * k, cx, cx + Lw * k].map(c => [c, half, half * .7]).filter(([c, h]) => c + h > 0 && c - h < W);
        // Links vom Arbeitsbereich (unter dem Titel) bleibt nur der Strich sichtbar.
        const z = this.o.zone || 0;
        if (z) zf = sm((cx / W - z + .02) / .12) * sm((1.02 - cx / W) / .1);
      } else {
        const f = Math.min(W * .3, this.fadePx() * this.dpr * 1.4);
        wins = [[W / 2, W / 2, f]];
      }
      const prof = x => {
        let w = 0, s = 0;
        for (const [c, h, f] of wins) {
          const d = Math.abs(x - c);
          w = Math.max(w, d < h - f ? 1 : d < h ? sm((h - d) / f) : 0);
          s = Math.max(s, d < h - f ? 1 : sm((h - f * .15 - d) / (f * .85)));
        }
        return [w * zf, s];
      };
      const gS = ctx.createLinearGradient(0, 0, W, 0), gB = ctx.createLinearGradient(0, 0, W, 0), N = 96;
      for (let i = 0; i <= N; i++) {
        const [w, s] = prof(i / N * W);
        gS.addColorStop(i / N, `rgba(0,0,0,${w * s})`); gB.addColorStop(i / N, `rgba(0,0,0,${w * (1 - s)})`);
      }
      const L = this.lctx;
      L.setTransform(1, 0, 0, 1, 0, 0); L.globalCompositeOperation = 'source-over'; L.globalAlpha = 1;
      L.clearRect(0, 0, W, H);
      L.filter = `blur(${3 * this.dpr}px)`; L.drawImage(this.canvas, 0, 0); L.filter = 'none';
      L.globalCompositeOperation = 'destination-in'; L.fillStyle = gB; L.fillRect(0, 0, W, H);
      L.globalCompositeOperation = 'source-over';
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = 'destination-in'; ctx.fillStyle = gS; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; ctx.drawImage(this.layer, 0, 0);
      ctx.restore();
    }

    // Die Linie fährt mit der Person aus: vom linken Rand bis unter ihre Füße,
    // hinten leise, vorne klar. Beim Umlauf blendet der volle Strich weich aus.
    drawStroke() {
      const ctx = this.ctx, W = this.canvas.width, k = this.scale * this.dpr, th = this.th;
      const sx = this.mode === 'window' ? wrap(this.sc.k.x, this.S.Lw) : this.sc.k.x - (this.camC - this.viewW / 2);
      const head = clamp(sx * k, 0, W);
      if (this.strokeHead != null && head < this.strokeHead - W / 2) this.strokeOld = 1;
      this.strokeHead = head;
      const y = this.canvas.height - this.dpr * .5;
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = this.dpr; ctx.lineCap = 'butt';
      if (this.strokeOld > 0) {
        const o = sm(this.strokeOld), gr = ctx.createLinearGradient(0, 0, W, 0);
        gr.addColorStop(0, R.rgba(th.text, 0)); gr.addColorStop(1, R.rgba(th.text, .45 * o));
        ctx.strokeStyle = gr; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      if (head > 2) {
        const gr = ctx.createLinearGradient(0, 0, head, 0);
        gr.addColorStop(0, R.rgba(th.text, 0)); gr.addColorStop(.6, R.rgba(th.text, .16)); gr.addColorStop(1, R.rgba(th.text, .5));
        ctx.strokeStyle = gr; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(head, y); ctx.stroke();
      }
      ctx.restore();
    }

    // Stil C: Szene in Graustufen auf ein kleines Raster, dann als Punkte.
    // part 'fig': nur die Figuren (Stil G), sonst die ganze Szene (Stil C).
    renderRaster(clear, part) {
      const gc = this.gctx, k = this.scale / this.cell;
      gc.setTransform(1, 0, 0, 1, 0, 0); gc.globalAlpha = 1; gc.fillStyle = '#000'; gc.fillRect(0, 0, this.gw, this.gh);
      const g = this.env(gc, this.cell * (this.kind === 'i' ? 1.5 : 1.15) / this.scale, 'c');
      g.part = part;
      gc.setTransform(k, 0, 0, -k, 0, k * this.ground);
      gc.translate(-g.camX, 0);
      R.drawScene(g, this.sc);
      const d = gc.getImageData(0, 0, this.gw, this.gh).data;

      const ctx = this.ctx, cell = this.cell, rmax = cell * (this.kind === 'i' ? .5 : .44);
      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0); ctx.globalCompositeOperation = 'source-over';
      if (clear) ctx.clearRect(0, 0, this.cssW, this.cssH);
      const ink = new Path2D(), acc = new Path2D(), base = new Path2D();
      const faint = this.o.layout === 'full';
      for (let j = 0; j < this.gh; j++) {
        const ey = this.ey[j], y = (j + .5) * cell;
        for (let i = 0; i < this.gw; i++) {
          const e = this.ex[i] * ey; if (e < .02) continue;
          const o = (j * this.gw + i) * 4, a = d[o + 1] / 255, n = d[o] / 255, x = (i + .5) * cell;
          if (a > .05) { const r = rmax * Math.sqrt(a) * e; acc.moveTo(x + r, y); acc.arc(x, y, r, 0, Math.PI * 2); }
          else if (n > .045) { const r = rmax * Math.sqrt(n) * e; ink.moveTo(x + r, y); ink.arc(x, y, r, 0, Math.PI * 2); }
          else if (faint && (i + j) % 2 === 0) { const r = .55 * e; base.moveTo(x + r, y); base.arc(x, y, r, 0, Math.PI * 2); }
        }
      }
      ctx.fillStyle = R.rgba(this.th.text, this.th.light ? .07 : .06); ctx.fill(base);
      ctx.fillStyle = R.rgba(this.th.text, .92); ctx.fill(ink);
      ctx.fillStyle = R.rgb(this.th.accent); ctx.fill(acc);
      if (part === 'fig') return;
      const s = this.scale * this.dpr, go = this.env(ctx, 1.25 / this.scale);
      go.overlay = true;
      ctx.setTransform(s, 0, 0, -s, 0, s * this.ground); ctx.translate(-go.camX, 0);
      R.drawGlyphs(go, this.sc);
    }
  }

  window.EinstiegAnimation = { mount: (root, opts) => new Stage(root, opts || 'a') };
})();
