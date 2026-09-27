/* =========================================================
   Einstieg-Animation · Zeichnen
   Drei Darstellungen desselben Modells (js/einstieg-szene.js):
   a  Linie   · Piktogramm-Figuren, Haarlinien, Linien zeichnen sich
   b  Bühne   · Silhouetten mit Bodenschatten, Glasflächen
   c  Raster  · Graustufen-Szene, die als Punktraster ausgegeben wird
   Alle Funktionen zeichnen in Welt-Koordinaten (y nach oben).
   ========================================================= */
(function () {
  'use strict';
  const Z = window.EinstiegSzene;
  const { TAU, clamp, lerp, sm, eo, back, RIG, ST, BLK, BTN } = Z;

  /* ---------- Farben ---------- */
  function parseColor(str) {
    str = (str || '').trim();
    if (str[0] === '#') {
      let h = str.slice(1);
      if (h.length === 3) h = h.split('').map(c => c + c).join('');
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    }
    const m = str.match(/[\d.]+/g);
    return m ? [+m[0], +m[1], +m[2]] : [128, 128, 128];
  }
  const mix = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
  const rgba = (c, a) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
  const rgb = c => `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;
  function readTheme() {
    const cs = getComputedStyle(document.documentElement);
    const g = n => parseColor(cs.getPropertyValue(n));
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    const text = g('--text'), bg = g('--bg'), warm1 = g('--warm-1'), warm2 = g('--warm-2'), cool2 = g('--cool-2'), muted = g('--muted');
    const accent = light ? warm1 : mix(warm1, warm2, .3);
    return {
      light, text, bg, muted, cool2, warm2, accent,
      skin: mix(text, warm2, light ? .45 : .5),          // Hände
      paper: mix(text, warm2, .18),                       // gefüllte Sprechblasen
      face: light ? mix(bg, [255, 255, 255], .55) : mix(bg, text, .055),   // Plattenfläche
      side: light ? mix(bg, text, .1) : mix(bg, text, .13),               // Plattenkante
      edge: mix(accent, bg, light ? .2 : .38),            // Kupferkante am Screen
    };
  }

  /* ---------- Grundformen ---------- */
  function rr(ctx, cx, cy, w, h, r) {
    r = Math.max(0, Math.min(r, w / 2, h / 2));
    const x = cx - w / 2, y = cy - h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  const rrLen = (w, h, r) => { r = Math.min(r, w / 2, h / 2); return 2 * (w + h) - 8 * r + TAU * r; };
  // sichtbarer Abschnitt [a, b] einer Linie der Länge L
  function dash(ctx, L, a, b) {
    if (a <= 0 && b >= L) { ctx.setLineDash([]); return true; }
    if (b - a <= .01) return false;
    ctx.setLineDash([b - a, L * 2]); ctx.lineDashOffset = -a; return true;
  }
  function poly(ctx, pts) { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); }
  function line(ctx, x0, y0, x1, y1) { ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); }
  function circle(ctx, x, y, r) { ctx.beginPath(); ctx.arc(x, y, Math.max(0, r), 0, TAU); }
  function glyph(ctx, ch, x, y, size, style, weight) {
    ctx.save(); ctx.translate(x, y); ctx.scale(1, -1);
    ctx.font = `italic ${weight || 400} ${size}px Fraunces, Georgia, serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = style;
    ctx.fillText(ch, 0, size * .04); ctx.restore();
  }
  // Sprechblase mit Spitze bei (0,0), die zur sprechenden Person zeigt.
  function bubblePath(ctx, dir) {
    const w = 36, h = 28, r = 10, cx = dir * 9, cy = 21;
    const x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - h / 2, y1 = cy + h / 2, tb = cx - dir * 4;
    ctx.beginPath();
    ctx.moveTo(x0 + r, y0);
    ctx.lineTo(tb - 3.5, y0); ctx.lineTo(0, 0); ctx.lineTo(tb + 3.5, y0);
    ctx.arcTo(x1, y0, x1, y1, r);
    ctx.arcTo(x1, y1, x0, y1, r);
    ctx.arcTo(x0, y1, x0, y0, r);
    ctx.arcTo(x0, y0, x1, y0, r);
    ctx.closePath();
    return [cx, cy];
  }

  /* ---------- Figuren ---------- */
  const FIG = {
    a: { leg: 9, arm: 7.5, torso: 17, foot: 7 },
    b: { leg: 10.5, arm: 8.5, torso: 19.5, foot: 8 },
    c: { leg: 10.5, arm: 9, torso: 19, foot: 8 },
  };
  function figure(ctx, J, f, near, far, hair) {
    const s = J.s;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.setLineDash([]);
    const limb = (pts, w, st) => { ctx.strokeStyle = st; ctx.lineWidth = w * s; poly(ctx, pts); ctx.stroke(); };
    limb([J.sh, J.eF, J.hF], f.arm, far);
    limb([J.hip, J.kF, J.aF], f.leg, far);
    limb([J.aF, J.tF], f.foot, far);
    limb([J.hip, J.sh], f.torso, near);
    limb([J.hip, J.kN, J.aN], f.leg, near);
    limb([J.aN, J.tN], f.foot, near);
    ctx.fillStyle = near;
    if (hair) { circle(ctx, J.head[0] - J.dir * 8.5 * s, J.head[1] + 6.5 * s, 4.8 * s); ctx.fill(); }
    circle(ctx, J.head[0], J.head[1], RIG.head * s); ctx.fill();
    limb([J.sh, J.eN, J.hN], f.arm, near);
  }
  const figBox = J => [J.x - 70 * J.s, -12, J.x + 70 * J.s, 190 * J.s];

  // Stile D bis F: dieselbe Figur mit Blickrichtung (Profil), Händen, Schuhen,
  // Haar und optional einem Mantel. Bleibt flach und reduziert.
  function figureFx(ctx, J, f, near, far, o) {
    const s = J.s, d = J.dir, r = RIG.head * s, [hx, hy] = J.head;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.setLineDash([]);
    const limb = (pts, w, st) => { ctx.strokeStyle = st; ctx.lineWidth = w * s; poly(ctx, pts); ctx.stroke(); };
    const shoe = (a, t, st) => {
      const vx = t[0] - a[0], vy = t[1] - a[1], L = Math.hypot(vx, vy) || 1;
      limb([[a[0] - vx / L * 2.5 * s, a[1] - vy / L * 2.5 * s], t], f.foot * 1.2, st);
    };
    const hand = (p, st) => { ctx.fillStyle = st; circle(ctx, p[0], p[1], 3.4 * s); ctx.fill(); };
    limb([J.sh, J.eF, J.hF], f.arm, far); hand(J.hF, o.skinFar);
    limb([J.hip, J.kF, J.aF], f.leg, far); shoe(J.aF, J.tF, far);
    limb([J.hip, J.kN, J.aN], f.leg, near); shoe(J.aN, J.tN, near);
    if (o.coat) {
      let ux = J.sh[0] - J.hip[0], uy = J.sh[1] - J.hip[1]; const L = Math.hypot(ux, uy); ux /= L; uy /= L;
      const nx = uy, ny = -ux, top = [J.sh[0] + ux * 4 * s, J.sh[1] + uy * 4 * s], hem = [J.hip[0] - ux * 13 * s, J.hip[1] - uy * 13 * s];
      ctx.beginPath();
      ctx.moveTo(top[0] + nx * 8 * s, top[1] + ny * 8 * s); ctx.lineTo(hem[0] + nx * 11 * s, hem[1] + ny * 11 * s);
      ctx.lineTo(hem[0] - nx * 11 * s, hem[1] - ny * 11 * s); ctx.lineTo(top[0] - nx * 8 * s, top[1] - ny * 8 * s); ctx.closePath();
      ctx.fillStyle = o.coat; ctx.strokeStyle = o.coat; ctx.lineWidth = 5 * s; ctx.fill(); ctx.stroke();
    } else limb([J.hip, J.sh], f.torso, near);
    ctx.fillStyle = near;
    if (o.hair) { circle(ctx, hx - d * 8.5 * s, hy + 6.5 * s, 4.8 * s); ctx.fill(); }
    circle(ctx, hx, hy, r); ctx.fill();
    ctx.beginPath();                                   // Nase: zeigt, wohin die Person schaut
    ctx.moveTo(hx + d * r * .8, hy + r * .28); ctx.lineTo(hx + d * (r + 2.2 * s), hy - r * .1); ctx.lineTo(hx + d * r * .78, hy - r * .34);
    ctx.closePath(); ctx.fill();
    if (o.cap) {                                       // kurzes Haar oben und hinten
      const a0 = d > 0 ? 1.15 : Math.PI - 3.65, a1 = d > 0 ? 3.65 : Math.PI - 1.15;
      ctx.fillStyle = o.cap; ctx.beginPath(); ctx.arc(hx, hy, r + .5 * s, a0, a1); ctx.closePath(); ctx.fill();
    }
    limb([J.sh, J.eN, J.hN], f.arm, o.coat || near); hand(J.hN, o.skin);
  }

  /* ---------- Platten mit Materialstärke (Stile E und F) ---------- */
  // Drehung um die Hochachse; die Kante liegt immer auf der abgewandten Seite.
  function slabT(c, turn) { c.transform(Math.cos(turn), -Math.sin(turn) * .12, 0, 1, 0, 0); }
  function slabBody(c, g, w, h, r, o) {
    const dx = 5 + 12 * Math.sin(o.turn || 0), dy = -3.5, n = 8;
    for (let i = n; i >= 1; i--) { rr(c, dx * i / n, dy * i / n, w, h, r); c.fillStyle = o.side; c.fill(); }
    rr(c, 0, 0, w, h, r); c.fillStyle = o.face; c.fill();
    if (o.stroke) { c.strokeStyle = o.stroke; c.lineWidth = g.hair; c.stroke(); }
    if (o.rim) { c.strokeStyle = o.rim; c.lineWidth = g.hair * 1.6; c.lineCap = 'round'; line(c, -w / 2 + r, h / 2, w / 2 - r, h / 2); c.stroke(); }
  }

  // role: 'me' (die Person) oder 'user'
  function drawPerson(g, J, role, a, hair) {
    const { ctx, th, kind } = g, f = FIG[kind];
    if (kind === 'c') {
      const I = (role === 'me' ? 1 : .62) * a;
      figure(ctx, J, f, rgb([255 * I, 0, 0]), rgb([255 * I * .66, 0, 0]), hair);
      return;
    }
    if (kind === 'a') {
      const near = rgb(th.text), far = rgb(mix(th.text, th.bg, .45)), fx = g.fx;
      if (fx.detail) {
        const me = role === 'me';
        const o = {
          hair, cap: null,
          skin: rgb(th.skin), skinFar: rgb(mix(th.skin, th.bg, .42)),
          coat: fx.coat ? rgb(me ? mix(th.accent, th.text, .1) : mix(th.cool2, th.text, .3)) : null,
        };
        g.alpha((me ? 1 : .55) * a, figBox(J), c => {
          if (fx.extrude) groundShadow(c, th, (J.aN[0] + J.aF[0]) / 2, 20 * J.s, 3.5 * J.s);
          figureFx(c, J, f, near, far, o);
        });
        return;
      }
      g.alpha((role === 'me' ? 1 : .52) * a, figBox(J), c => figure(c, J, f, near, far, hair));
      return;
    }
    // b: Silhouette mit Verlauf und weichem Bodenschatten
    g.alpha(a, figBox(J), c => {
      const cx = (J.aN[0] + J.aF[0]) / 2, spread = Math.abs(J.aN[0] - J.aF[0]);
      c.save(); c.translate(cx, 0); c.scale(24 * J.s + spread * .4, 4.5 * J.s);
      const sg = c.createRadialGradient(0, 0, 0, 0, 0, 1);
      sg.addColorStop(0, th.light ? 'rgba(70,50,40,.22)' : 'rgba(0,0,0,.5)'); sg.addColorStop(1, 'rgba(0,0,0,0)');
      c.fillStyle = sg; circle(c, 0, 0, 1); c.fill(); c.restore();
      const top = J.head[1] + 12 * J.s;
      const mk = (c1, c2) => { const gr = c.createLinearGradient(0, top, 0, 0); gr.addColorStop(0, rgb(c1)); gr.addColorStop(1, rgb(c2)); return gr; };
      const hi = role === 'me' ? mix(th.text, th.accent, .16) : mix(th.muted, th.cool2, .4);
      const lo = role === 'me' ? mix(th.text, th.bg, .3) : mix(th.muted, th.bg, .38);
      figure(c, J, f, mk(hi, lo), mk(mix(hi, th.bg, .38), mix(lo, th.bg, .4)), hair);
    });
  }

  /* ---------- Boden ---------- */
  function drawGround(g) {
    if (g.ground === false) return;
    const { ctx, th, kind } = g, x0 = g.left - 40, x1 = g.left + g.viewW + 40;
    ctx.setLineDash([]); ctx.lineCap = 'butt';
    if (kind === 'a') {
      ctx.strokeStyle = rgba(th.text, .13); ctx.lineWidth = g.hair; line(ctx, x0, 0, x1, 0); ctx.stroke();
      ctx.strokeStyle = rgba(th.text, .2);
      for (let x = Math.ceil(x0 / 32) * 32; x < x1; x += 32) {
        const big = Math.round(x / 32) % 4 === 0;
        line(ctx, x, 0, x, big ? -7 : -3.5); ctx.stroke();
      }
    } else if (kind === 'b') {
      const gr = ctx.createLinearGradient(x0, 0, x1, 0);
      gr.addColorStop(0, rgba(th.text, 0)); gr.addColorStop(.5, rgba(th.text, th.light ? .16 : .12)); gr.addColorStop(1, rgba(th.text, 0));
      ctx.strokeStyle = gr; ctx.lineWidth = g.hair; line(ctx, x0, 0, x1, 0); ctx.stroke();
    } else {
      ctx.strokeStyle = g.ink(.4); ctx.lineWidth = g.hair;
      ctx.setLineDash([10, 12]); ctx.lineDashOffset = 0; line(ctx, Math.floor(x0 / 22) * 22, -2, x1, -2); ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  /* ---------- Station: Tafel ---------- */
  function drawBoard(g, sc) {
    const { ctx, th, kind } = g, C = sc.C;
    if (C.a <= .002) return;
    const bx = C.x + ST.c.bx, by = ST.c.by, w = ST.c.bw, h = ST.c.bh;
    const legs = [[bx - 70, by - h / 2, bx - 80, 0], [bx + 70, by - h / 2, bx + 80, 0]];
    ctx.lineCap = 'round';
    if (kind === 'a' && g.fx.extrude) {
      const turn = g.fx.turn ? (1 - eo(C.pin)) * 1.25 - sm(C.pout) * 1.25 + .08 : .08;
      g.alpha(C.a, [bx - 150, -20, bx + 150, 215], c => {
        groundShadow(c, th, bx, w * .5, 5, .6);
        c.strokeStyle = rgba(th.text, .2); c.lineWidth = g.hair * 1.2;
        for (const l of legs) { line(c, l[0], l[1], l[2], l[3]); c.stroke(); }
        c.translate(bx, by); slabT(c, turn);
        if (g.fx.material) { c.save(); c.rotate(-.025); rr(c, -4, -3, w, h, 8); c.fillStyle = rgb(th.side); c.fill(); c.restore(); }
        slabBody(c, g, w, h, 8, { turn, face: rgb(th.face), side: rgb(th.side), stroke: rgba(th.text, .14) });
      });
      return;
    }
    if (kind === 'a') {
      const L = rrLen(w, h, 7);
      ctx.strokeStyle = rgba(th.text, .4); ctx.lineWidth = g.hair;
      if (dash(ctx, L, C.pout * L, C.pin * L)) { rr(ctx, bx, by, w, h, 7); ctx.stroke(); }
      const lp = sm((C.pin - .4) / .6), lq = sm(C.pout / .6);
      for (const l of legs) {
        const Ll = Math.hypot(l[2] - l[0], l[3] - l[1]);
        if (dash(ctx, Ll, lq * Ll, lp * Ll)) { line(ctx, l[0], l[1], l[2], l[3]); ctx.stroke(); }
      }
      ctx.setLineDash([]);
    } else if (kind === 'b') {
      g.alpha(C.a, [bx - 130, -20, bx + 130, 200], c => {
        c.translate(0, -14 * (1 - eo(C.pin)));
        groundShadow(c, th, bx, w * .55, 6);
        c.strokeStyle = rgba(th.text, .2); c.lineWidth = g.hair * 1.4;
        for (const l of legs) { line(c, l[0], l[1], l[2], l[3]); c.stroke(); }
        glass(c, g, bx, by, w, h, 12);
      });
    } else {
      ctx.globalAlpha = C.a;
      rr(ctx, bx, by, w, h, 8);
      ctx.strokeStyle = g.ink(.55); ctx.lineWidth = g.hair; ctx.stroke();
      for (const l of legs) { line(ctx, l[0], l[1], l[2], l[3]); ctx.stroke(); }
      ctx.globalAlpha = 1;
    }
  }
  function groundShadow(c, th, x, rx, ry, k = 1) {
    c.save(); c.translate(x, 0); c.scale(rx, ry);
    const sg = c.createRadialGradient(0, 0, 0, 0, 0, 1);
    sg.addColorStop(0, th.light ? `rgba(70,50,40,${.16 * k})` : `rgba(0,0,0,${.42 * k})`); sg.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = sg; circle(c, 0, 0, 1); c.fill(); c.restore();
  }
  function glass(c, g, cx, cy, w, h, r, tint) {
    const th = g.th, light = th.light;
    const f = c.createLinearGradient(0, cy + h / 2, 0, cy - h / 2);
    if (light) { f.addColorStop(0, 'rgba(255,255,255,.8)'); f.addColorStop(1, 'rgba(255,255,255,.42)'); }
    else { f.addColorStop(0, rgba(th.text, .13)); f.addColorStop(1, rgba(th.text, .04)); }
    rr(c, cx, cy, w, h, r); c.fillStyle = f; c.fill();
    if (tint) { c.fillStyle = tint; c.fill(); }
    const s = c.createLinearGradient(0, cy + h / 2, 0, cy - h / 2);
    s.addColorStop(0, light ? 'rgba(255,255,255,1)' : rgba(th.text, .36));
    s.addColorStop(1, light ? rgba(th.text, .12) : rgba(th.text, .07));
    c.strokeStyle = s; c.lineWidth = g.hair; c.stroke();
  }

  function drawNotes(g, sc) {
    const { ctx, th, kind } = g;
    for (const n of sc.notes) {
      if (n.size < .3) continue;
      if (g.fx.material) {                 // Papierkarte mit Eselsohr und leichtem Schatten
        const s = n.size, fo = s * .28, x0 = n.x - s / 2, y0 = n.y - s / 2;
        rr(ctx, n.x + 1.4, n.y - 1.6, s, s, n.r); ctx.fillStyle = `rgba(0,0,0,${(th.light ? .08 : .22) * n.a})`; ctx.fill();
        const col = n.ember ? th.accent : mix(th.bg, th.text, th.light ? .2 : .3);
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + s, y0); ctx.lineTo(x0 + s, y0 + s - fo); ctx.lineTo(x0 + s - fo, y0 + s); ctx.lineTo(x0, y0 + s); ctx.closePath();
        ctx.fillStyle = rgba(col, .95 * n.a); ctx.fill();
        ctx.beginPath(); ctx.moveTo(x0 + s, y0 + s - fo); ctx.lineTo(x0 + s - fo, y0 + s - fo); ctx.lineTo(x0 + s - fo, y0 + s); ctx.closePath();
        ctx.fillStyle = rgba(mix(col, th.bg, .35), n.a); ctx.fill();
        continue;
      }
      rr(ctx, n.x, n.y, n.size, n.size, n.r);
      if (kind === 'c') { ctx.fillStyle = n.ember ? g.acc(n.a) : g.ink(.6 * n.a); ctx.fill(); continue; }
      if (n.ember) {
        ctx.fillStyle = rgba(th.accent, .92 * n.a); ctx.fill();
      } else if (kind === 'a') {
        ctx.fillStyle = rgba(th.text, .07 * n.a); ctx.fill();
        ctx.strokeStyle = rgba(th.text, .5 * n.a); ctx.lineWidth = g.hair; ctx.setLineDash([]); ctx.stroke();
      } else {
        ctx.fillStyle = th.light ? rgba([255, 255, 255], .9 * n.a) : rgba(th.text, .16 * n.a); ctx.fill();
        ctx.strokeStyle = rgba(th.text, (th.light ? .14 : .28) * n.a); ctx.lineWidth = g.hair; ctx.setLineDash([]); ctx.stroke();
      }
    }
  }

  // Struktur-Knoten; im Endzustand identisch mit den Wireframe-Blöcken des Screens.
  function nodeStyle(g, rect, a, root) {
    const { ctx, th, kind } = g;
    if (g.fx.extrude && g.depth > .01) {  // flache Kante, die sich beim Ankommen im Screen auflöst
      const k = g.depth * Math.min(1, rect[2] / 30);
      rr(ctx, rect[0] + 2.4 * k, rect[1] - 2 * k, rect[2], rect[3], rect[4]); ctx.fillStyle = rgba(th.side, a); ctx.fill();
      rr(ctx, rect[0], rect[1], rect[2], rect[3], rect[4]); ctx.fillStyle = rgba(th.face, a); ctx.fill();
    }
    rr(ctx, rect[0], rect[1], rect[2], rect[3], rect[4]);
    if (kind === 'c') { ctx.fillStyle = g.ink((root ? .55 : .4) * a); ctx.fill(); return; }
    ctx.fillStyle = rgba(th.text, (kind === 'b' ? .1 : .06) * a); ctx.fill();
    ctx.strokeStyle = rgba(th.text, .55 * a); ctx.lineWidth = g.hair; ctx.setLineDash([]); ctx.stroke();
  }
  function drawStruct(g, sc) {
    const st = sc.struct; if (!st) return;
    const { ctx, th, kind } = g, a = st.a;
    // Verbindungen: Wurzel nach unten, Querlinie, drei Abzweige
    const k = st.scl, c = st.cen, ca = a * clamp(1 - st.morph * 3, 0, 1);
    if (ca > .01 && st.conn > 0) {
      const P = (x, y) => [c[0] + x * k, c[1] + y * k];
      const segs = [[P(0, 10), P(0, 0)], [P(-55, 0), P(55, 0)], [P(-55, 0), P(-55, -10)], [P(0, 0), P(0, -10)], [P(55, 0), P(55, -10)]];
      ctx.strokeStyle = kind === 'c' ? g.ink(.55 * ca) : rgba(th.text, .45 * ca);
      ctx.lineWidth = g.hair; ctx.lineCap = 'round';
      segs.forEach((s, i) => {
        const p = clamp(st.conn * 5 - i * .8, 0, 1); if (p <= 0) return;
        const L = Math.hypot(s[1][0] - s[0][0], s[1][1] - s[0][1]);
        if (dash(ctx, L, 0, p * L)) { line(ctx, s[0][0], s[0][1], s[1][0], s[1][1]); ctx.stroke(); }
      });
      ctx.setLineDash([]);
    }
    g.depth = 1 - st.morph;
    st.rects.forEach((r, i) => { if (r[2] > .5) nodeStyle(g, r, a, i === 0); });
    g.depth = 0;
  }

  /* ---------- Station: Screen ---------- */
  function drawPhone(g, sc) {
    const ph = sc.phone; if (!ph) return;
    const { ctx, th, kind } = g, W = ST.d.pw, H = ST.d.ph;
    if (kind === 'a' && g.fx.extrude) {    // Graphitplatte mit Kupferkante, dreht sich herein
      const turn = g.fx.turn ? (1 - eo(ph.pin)) * 1.3 - sm(ph.pout) * 1.3 - .1 : -.1;
      g.alpha(ph.a, [ph.x - 80, -20, ph.x + 80, 230], c => {
        groundShadow(c, th, ph.x, 48, 5, .6);
        c.translate(ph.x, ph.y); slabT(c, turn);
        slabBody(c, g, W, H, 16, { turn, face: rgb(th.face), side: rgb(th.edge), stroke: rgba(th.text, .16), rim: rgba(th.accent, .7) });
        rr(c, 0, 0, W - 12, H - 14, 11); c.fillStyle = th.light ? 'rgba(20,16,12,.035)' : 'rgba(0,0,0,.28)'; c.fill();
        rr(c, 0, H / 2 - 8, 18, 3.4, 1.7); c.fillStyle = rgba(th.text, .3); c.fill();
        screen(c, g, ph);
      });
      return;
    }
    const draw = c => {
      c.save(); c.translate(ph.x, ph.y);
      if (kind === 'a') {
        const L = rrLen(W, H, 16);
        c.strokeStyle = rgba(th.text, .5); c.lineWidth = g.hair;
        if (dash(c, L, ph.pout * L, ph.pin * L)) { rr(c, 0, 0, W, H, 16); c.stroke(); }
        c.setLineDash([]);
        c.globalAlpha = sm((ph.pin - .5) / .5) * (1 - ph.pout);
        rr(c, 0, H / 2 - 8, 18, 3.4, 1.7); c.fillStyle = rgba(th.text, .35); c.fill();
      } else if (kind === 'b') {
        c.translate(0, -14 * (1 - eo(ph.pin)));
        groundShadow(c, th, 0, 48, 5);
        glass(c, g, 0, 0, W, H, 17);
        rr(c, 0, 0, W - 12, H - 14, 11); c.fillStyle = th.light ? 'rgba(20,16,12,.045)' : 'rgba(0,0,0,.32)'; c.fill();
        rr(c, 0, H / 2 - 8, 18, 3.4, 1.7); c.fillStyle = rgba(th.text, .3); c.fill();
      } else {
        c.globalAlpha = ph.a;
        rr(c, 0, 0, W, H, 16); c.strokeStyle = g.ink(.6); c.lineWidth = g.hair * 1.1; c.stroke();
        rr(c, 0, H / 2 - 8, 18, 3.4, 1.7); c.fillStyle = g.ink(.5); c.fill();
      }
      screen(c, g, ph);
      c.restore();
    };
    if (kind === 'b') g.alpha(ph.a, [ph.x - 70, -20, ph.x + 70, 220], draw);
    else { ctx.save(); draw(ctx); ctx.restore(); }
  }

  function screen(c, g, ph) {
    if (!ph.wire) return;
    const { th, kind } = g, C = kind === 'c';
    const ink = a => (C ? g.ink(a) : rgba(th.text, a));
    const acc = a => (C ? g.acc(a) : rgba(th.accent, a));
    c.save();
    rr(c, 0, 0, 80, 164, 11); c.clip();
    if (kind === 'a') c.globalAlpha *= 1 - ph.pout;
    const s1 = () => {
      BLK.forEach((b, i) => {
        const hf = ph.hifi[i], r = i === 0 ? 3.5 : lerp(3, 6, hf);
        rr(c, b[0], b[1], b[2], b[3], r);
        if (i === 1) {
          const gr = c.createLinearGradient(b[0] - b[2] / 2, b[1] + b[3] / 2, b[0] + b[2] / 2, b[1] - b[3] / 2);
          gr.addColorStop(0, C ? g.acc(.85 * hf) : rgba(th.accent, .95 * hf));
          gr.addColorStop(1, C ? g.acc(.35 * hf) : rgba(th.cool2, .75 * hf));
          c.fillStyle = gr; c.fill();
        } else { c.fillStyle = ink((i === 0 ? .55 : kind === 'b' ? .12 : .09) * (i === 0 ? hf : 1) + (i === 0 ? 0 : (kind === 'b' ? .1 : .06) * (1 - hf))); c.fill(); }
        if (!C) { c.strokeStyle = rgba(th.text, .55 * (1 - .75 * hf)); c.lineWidth = g.hair; c.stroke(); }
        if (i === 1 && hf < 1) {           // Platzhalter-Kreuz im Wireframe
          c.strokeStyle = ink(.35 * (1 - hf)); c.lineWidth = g.hair;
          line(c, b[0] - b[2] / 2 + 4, b[1] - b[3] / 2 + 4, b[0] + b[2] / 2 - 4, b[1] + b[3] / 2 - 4); c.stroke();
          line(c, b[0] - b[2] / 2 + 4, b[1] + b[3] / 2 - 4, b[0] + b[2] / 2 - 4, b[1] - b[3] / 2 + 4); c.stroke();
        }
        if (i >= 2 && ph.txt > 0) {        // Zeilen: Avatar und zwei Textlinien
          circle(c, b[0] - 26, b[1], 5.5 * eo(ph.txt)); c.fillStyle = ink(.32); c.fill();
          c.strokeStyle = ink(C ? .5 : .32); c.lineWidth = C ? g.hair : 3; c.lineCap = 'round';
          const L1 = 36 * eo(ph.txt), L2 = 22 * eo(rng2(ph.txt, .25, 1));
          if (L1 > .5) { line(c, b[0] - 15, b[1] + 3.5, b[0] - 15 + L1, b[1] + 3.5); c.stroke(); }
          if (L2 > .5) { line(c, b[0] - 15, b[1] - 3.5, b[0] - 15 + L2, b[1] - 3.5); c.stroke(); }
        }
      });
      if (ph.hifi[0] > 0) { circle(c, 27, 64, 4.5 * eo(ph.hifi[0])); c.fillStyle = ink(.3); c.fill(); }
      if (ph.btn > 0) {                    // Button
        const s = back(ph.btn) * (1 - .06 * ph.press);
        c.save(); c.translate(BTN[0], BTN[1]); c.scale(s, s);
        rr(c, 0, 0, BTN[2], BTN[3], 6.5); c.fillStyle = acc(C ? 1 : .95); c.fill();
        if (!C) { c.strokeStyle = th.light ? 'rgba(255,255,255,.85)' : rgba(th.bg, .7); c.lineWidth = 2.4; c.lineCap = 'round'; line(c, -9, 0, 9, 0); c.stroke(); }
        c.restore();
      }
      if (ph.txt > 0) {                    // Tab-Leiste
        [-20, 0, 20].forEach((x, i) => { circle(c, x, -73, 2.2 * eo(ph.txt)); c.fillStyle = i === 0 ? acc(.9) : ink(.3); c.fill(); });
      }
    };
    const s2 = () => {                     // Ergebnis nach dem Tippen
      const L = TAU * 18;
      c.strokeStyle = acc(1); c.lineWidth = C ? g.hair * 1.2 : 2; c.lineCap = 'round'; c.lineJoin = 'round';
      if (dash(c, L, 0, ph.ring * L)) { c.beginPath(); c.arc(0, 30, 18, Math.PI / 2, Math.PI / 2 + TAU); c.stroke(); }
      const ck = [[-8, 30], [-2, 23.5], [9, 37]], Lc = 9 + 17.8;
      if (dash(c, Lc, 0, ph.check * Lc)) { poly(c, ck); c.stroke(); }
      c.setLineDash([]);
      c.strokeStyle = ink(C ? .5 : .32); c.lineWidth = C ? g.hair : 3;
      const q = eo(ph.ring);
      line(c, -22 * q, -8, 22 * q, -8); c.stroke();
      line(c, -15 * q, -19, 15 * q, -19); c.stroke();
      rr(c, 0, -54, 70, 13, 6.5); c.strokeStyle = ink(.35 * q); c.lineWidth = C ? g.hair : g.hair; c.stroke();
    };
    if (ph.slide < 1) { c.save(); c.translate(-80 * ph.slide, 0); c.globalAlpha *= 1 - .7 * ph.slide; s1(); c.restore(); }
    if (ph.slide > 0) { c.save(); c.translate(80 * (1 - ph.slide), 0); s2(); c.restore(); }
    c.restore();
    c.setLineDash([]);
  }
  const rng2 = (u, a, b) => clamp((u - a) / (b - a), 0, 1);

  function drawRipple(g, sc) {
    const ph = sc.phone; if (!ph || ph.ripple <= 0 || ph.ripple >= 1) return;
    const { ctx, th, kind } = g, p = ph.ripple;
    circle(ctx, ph.tap[0], ph.tap[1], 3 + 20 * eo(p));
    ctx.strokeStyle = kind === 'c' ? g.acc(1 - p) : rgba(th.accent, .85 * (1 - p));
    ctx.lineWidth = kind === 'c' ? g.hair : g.hair * 1.3; ctx.setLineDash([]); ctx.stroke();
  }

  /* ---------- Erkenntnisse und Sprechblasen ---------- */
  function drawDots(g, sc) {
    const { ctx, th, kind } = g;
    for (const d of sc.dots) {
      if (kind === 'c') { circle(ctx, d[0], d[1], 6.2); ctx.fillStyle = g.acc(1); ctx.fill(); continue; }
      if (kind === 'b') {
        ctx.save(); ctx.shadowColor = rgba(th.accent, .9); ctx.shadowBlur = 10 * g.dpr;
        circle(ctx, d[0], d[1], 3.8); ctx.fillStyle = rgb(mix(th.accent, [255, 255, 255], th.light ? 0 : .12)); ctx.fill(); ctx.restore();
      } else if (g.fx.cards) {             // kleine Karte, die im Flug leicht kippt
        const i = sc.dots.indexOf(d);
        ctx.save(); ctx.translate(d[0], d[1]); ctx.rotate(Math.sin(g.T * 1.6 + i * 1.9) * .45);
        rr(ctx, 0, 0, 9, 6.5, 1.8); ctx.fillStyle = rgb(th.accent); ctx.fill(); ctx.restore();
      } else {
        circle(ctx, d[0], d[1], 7.5); ctx.fillStyle = rgba(th.accent, .16); ctx.fill();
        circle(ctx, d[0], d[1], 3.4); ctx.fillStyle = rgb(th.accent); ctx.fill();
      }
    }
  }

  function drawBubbles(g, sc) {
    const { ctx, th, kind } = g;
    for (const b of sc.bubbles) {
      if (b.a <= .01) continue;
      const big = (kind === 'c' ? 1.3 : 1) * (g.bub || 1);
      ctx.save(); ctx.translate(b.x, b.y); ctx.scale(b.s * big, b.s * big);
      ctx.globalAlpha = b.a;
      const [cx, cy] = bubblePath(ctx, b.dir);
      ctx.setLineDash([]); ctx.lineJoin = 'round';
      let gl;
      if (g.overlay) {
        gl = rgba(th.text, .95);
      } else if (kind === 'a' && g.fx.solid) {   // gefüllt: auch klein gut lesbar
        ctx.fillStyle = rgba(th.paper, .92); ctx.fill();
        gl = rgb(th.bg);
      } else if (kind === 'a') {
        ctx.fillStyle = rgba(th.text, .05); ctx.fill();
        ctx.strokeStyle = rgba(th.text, .6); ctx.lineWidth = g.hair / (b.s * big); ctx.stroke();
        gl = rgba(th.text, .95);
      } else if (kind === 'b') {
        ctx.fillStyle = th.light ? 'rgba(255,255,255,.82)' : rgba(th.text, .12); ctx.fill();
        ctx.strokeStyle = th.light ? rgba(th.text, .14) : rgba(th.text, .3); ctx.lineWidth = g.hair / (b.s * big); ctx.stroke();
        gl = rgb(th.text);
      } else {
        ctx.fillStyle = g.ink(.12); ctx.fill();
        ctx.strokeStyle = g.ink(.75); ctx.lineWidth = g.hair / (b.s * big); ctx.stroke();
        gl = g.ink(1);
      }
      const W = kind === 'c' ? 500 : 400, size = kind === 'c' ? 23 : 21;
      if (kind === 'c' && !g.overlay) { ctx.restore(); continue; }
      if (b.glyph === '…') {
        const a1 = 1 - b.m;
        if (a1 > .01) {
          ctx.globalAlpha = b.a * a1; ctx.fillStyle = gl;
          for (let i = 0; i < 3; i++) {
            const y = cy - 1 + 2.4 * Math.max(0, Math.sin(g.T * TAU * 1.5 - i * .9));
            circle(ctx, cx - 7 + i * 7, y, kind === 'c' ? 2.8 : 2.1); ctx.fill();
          }
        }
        if (b.m > .01) {
          ctx.globalAlpha = b.a * b.m;
          ctx.save(); ctx.translate(cx, cy); const s = .6 + .4 * back(b.m); ctx.scale(s, s);
          glyph(ctx, b.glyph2, 0, 0, size, gl, W); ctx.restore();
        }
      } else glyph(ctx, b.glyph, cx, cy, size, gl, W);
      ctx.restore();
    }
  }

  /* ---------- Gesamte Szene ---------- */
  // g.part: 'env' zeichnet nur die Umgebung, 'fig' nur die Figuren (Stil G).
  function drawScene(g, sc) {
    const E = g.part !== 'fig', F = g.part !== 'env';
    if (E) drawGround(g);
    if (F) g.place(sc.R.x, () => { sc.users.forEach(u => drawPerson(g, u.J, 'user', u.a, u.hair)); });
    if (E) g.place(sc.C.x, () => { drawBoard(g, sc); drawNotes(g, sc); });
    g.place(sc.D.x, () => {
      if (E) drawPhone(g, sc);
      if (F && sc.tester) drawPerson(g, sc.tester.J, 'user', sc.tester.a, true);
      if (E) drawRipple(g, sc);
    });
    if (E && sc.struct) g.place(sc.struct.cen[0], () => drawStruct(g, sc));
    if (F) g.place(sc.walker.x, () => drawPerson(g, sc.walker, 'me', 1, false));
    if (E) g.place(sc.walker.x, () => { drawDots(g, sc); drawBubbles(g, sc); });
  }

  // Variante C: Zeichen in den Blasen bleiben scharf über dem Raster.
  function drawGlyphs(g, sc) { g.place(sc.walker.x, () => drawBubbles(g, sc)); }

  window.EinstiegZeichnen = { readTheme, drawScene, drawGlyphs, rgba, rgb, mix };
})();
