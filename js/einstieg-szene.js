/* =========================================================
   Einstieg-Animation · Szene (Zeitachse, Figuren-Rig, Stationen)
   Eine Person geht von links nach rechts durch Research,
   Konzeption und Gestaltung. Dieses Modell ist für alle drei
   Varianten gleich; js/einstieg-animation.js zeichnet es.
   Koordinaten: Welt-Einheiten, y zeigt nach oben, Boden = 0.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Mathe ---------- */
  const TAU = Math.PI * 2, DEG = Math.PI / 180;
  const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);
  const lerp = (a, b, t) => a + (b - a) * t;
  const sm = t => (t = clamp(t, 0, 1), t * t * (3 - 2 * t));
  const smr = t => (t = clamp(t, 0, 1), t * t * t * (t * (t * 6 - 15) + 10));
  const eo = t => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
  const eio = t => (t = clamp(t, 0, 1), t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const back = t => (t = clamp(t, 0, 1) - 1, 1 + 2.6 * t * t * t + 1.6 * t * t);
  const rng = (u, a, b) => clamp((u - a) / (b - a), 0, 1);
  const env = (u, a, b, c, d) => sm(rng(u, a, b)) * (1 - sm(rng(u, c, d)));
  const pulse = (u, a, d) => Math.pow(Math.sin(Math.PI * rng(u, a, a + d)), 2);
  const wrap = (x, m) => ((x % m) + m) % m;

  /* ---------- Rig ---------- */
  // Proportionen in Anlehnung an Piktogramme: Kopf frei über dem Rumpf.
  const RIG = { legU: 40, legL: 40, foot: 11, ankle: 3, torso: 42, headGap: 23, head: 11, armU: 27, armL: 25, hip: 81.5 };
  const BETA = .6;            // Anteil Standphase am Doppelschritt
  const V_WALK = 125;         // Gehgeschwindigkeit (Einheiten/s)
  const T_RAMP = .9;          // Anfahren / Abbremsen
  const CYCLE = 124;          // Doppelschrittlänge (Richtwert)

  // Fuß relativ zur Hüfte. In der Standphase steht der Fuß in der Welt still
  // (kein Rutschen), in der Schwungphase hebt er ab und setzt vorne wieder auf.
  function legState(f, half) {
    let rel, ay, th;
    if (f < BETA) {
      rel = half * (1 - 2 * f / BETA);
      const k = sm(rng(f, .55 * BETA, BETA));                 // Ferse hebt ab
      ay = RIG.ankle + 7 * k;
      th = 35 * k - 12 * (1 - sm(rng(f, 0, .15 * BETA)));      // Fersenaufsatz
    } else {
      const s = (f - BETA) / (1 - BETA);
      rel = -half + 2 * half * smr(s);
      ay = RIG.ankle + 7 * clamp(1 - s / .25, 0, 1) + 13 * Math.pow(Math.sin(Math.PI * s), 1.4);
      th = lerp(35, -12, sm(s));
    }
    return { rel, ay, th };
  }

  function ik(hx, hy, tx, ty, l1, l2, bend) {
    let dx = tx - hx, dy = ty - hy, d = Math.hypot(dx, dy);
    const max = (l1 + l2) * .999;
    if (d > max) { dx *= max / d; dy *= max / d; d = max; }
    d = Math.max(d, 1e-3);
    const a = Math.atan2(dy, dx);
    const A = Math.acos(clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1));
    const ang = a + bend * A;
    return { kx: hx + l1 * Math.cos(ang), ky: hy + l1 * Math.sin(ang), ex: hx + dx, ey: hy + dy };
  }
  const angOf = (dx, dy) => Math.atan2(dx, -dy) / DEG;   // 0 = hängend, + = nach vorn

  // o: x, dir (1 = schaut nach rechts), s (Größe), w (Gehen 0..1), ph (Phase),
  //    t (Zeit), seed, nod (0..1), gN/gF Gesten {k, a, e} oder {k, tx, ty}
  function pose(o) {
    const s = o.s || 1, dir = o.dir || 1, w = o.w || 0, t = o.t || 0, seed = o.seed || 0;
    const half = (o.cyc || CYCLE) * BETA / 2, ph = o.ph || 0;
    const fN = wrap(ph, 1), fF = wrap(ph + .5, 1);
    const LN = legState(fN, half), LF = legState(fF, half);
    const breath = Math.sin(t * TAU / 4.4 + seed);
    const sway = Math.sin(t * TAU / 6.5 + seed * 2.1) * (1 - w);
    const mixL = (a, b) => ({ rel: lerp(b.rel, a.rel, w), ay: lerp(b.ay, a.ay, w), th: lerp(b.th, a.th, w) });
    const lN = mixL(LN, { rel: 6, ay: RIG.ankle, th: 0 });
    const lF = mixL(LF, { rel: -5, ay: RIG.ankle, th: 0 });
    const hx = sway * .9;
    const hy = lerp(RIG.hip + breath * .3, 75 + 2 * Math.cos(TAU * 2 * (fN - .3)), w);
    const lean = ((o.lean != null ? o.lean : 1.5) + 4 * w) * DEG;
    const shx = hx + Math.sin(lean) * RIG.torso, shy = hy + Math.cos(lean) * RIG.torso + breath * .4;
    const hl = lean + (o.nod || 0) * 17 * DEG;
    const hdx = shx + Math.sin(hl) * RIG.headGap, hdy = shy + Math.cos(hl) * RIG.headGap;

    const leg = l => {
      const r = ik(hx, hy, l.rel, l.ay, RIG.legU, RIG.legL, 1), th = l.th * DEG;
      return { k: [r.kx, r.ky], a: [r.ex, r.ey], t: [r.ex + Math.cos(th) * RIG.foot, r.ey - Math.sin(th) * RIG.foot] };
    };
    const legN = leg(lN), legF = leg(lF);

    const gN = w * LN.rel / half, gF = w * LF.rel / half;     // Arme gegengleich zu den Beinen
    const baseArm = g => { const a = 4 - 22 * g; return { a, e: 10 + 16 * Math.max(0, a / 22) }; };
    const arm = (base, g) => {
      let a = base.a, e = base.e;
      if (g && g.k > 0) {
        let ga = g.a, ge = g.e;
        if (g.tx != null) {
          const lx = (g.tx - o.x) * dir / s, ly = g.ty / s;
          const r = ik(shx, shy, lx, ly, RIG.armU, RIG.armL, -1);
          ga = angOf(r.kx - shx, r.ky - shy);
          ge = angOf(r.ex - r.kx, r.ey - r.ky) - ga;
          ge = ((ge + 540) % 360) - 180;
        }
        a = lerp(a, ga, g.k); e = lerp(e, ge, g.k);
      }
      const ex = shx + Math.sin(a * DEG) * RIG.armU, ey = shy - Math.cos(a * DEG) * RIG.armU;
      const b = (a + e) * DEG;
      return { e: [ex, ey], h: [ex + Math.sin(b) * RIG.armL, ey - Math.cos(b) * RIG.armL] };
    };
    const armN = arm(baseArm(gN), o.gN), armF = arm(baseArm(gF), o.gF);
    const W = p => [o.x + dir * s * p[0], s * p[1]];
    return {
      s, dir, x: o.x,
      hip: W([hx, hy]), sh: W([shx, shy]), head: W([hdx, hdy]),
      kN: W(legN.k), aN: W(legN.a), tN: W(legN.t), kF: W(legF.k), aF: W(legF.a), tF: W(legF.t),
      eN: W(armN.e), hN: W(armN.h), eF: W(armF.e), hF: W(armF.h),
    };
  }

  /* ---------- Zeitachse ---------- */
  // Versatz relativ zur Basis jeder Station.
  const ST = {
    r: { stop: -78, stay: 6.2, u1: 18, u2: 80 },
    c: { stop: -118, stay: 6.6, bx: 35, by: 126, bw: 210, bh: 128 },
    d: { stop: -100, stay: 7.4, py: 116, pw: 92, ph: 178, tester: 60 },
  };

  function buildScript(bases, Lw) {
    const st = ['r', 'c', 'd'].map((id, i) => ({ id, base: bases[i], stop: bases[i] + ST[id].stop, stay: ST[id].stay }));
    const segs = []; let t = 0, prev = st[2].stop - Lw;
    for (const s of st) {
      const d = s.stop - prev, T = d / V_WALK + T_RAMP;
      segs.push({ walk: true, t0: t, t1: t + T, x0: prev, T });
      t += T; s.arrive = t;
      segs.push({ walk: false, t0: t, t1: t + s.stay, x0: s.stop });
      t += s.stay; prev = s.stop;
    }
    // ganzzahlige Zahl Doppelschritte pro Runde, damit die Schleife nahtlos ist
    const cyc = Lw / Math.max(1, Math.round(Lw / CYCLE));
    return { st, segs, P: t, Lw, cyc, R: st[0], C: st[1], D: st[2] };
  }

  function rampDist(u, T) {
    const V = V_WALK, a = T_RAMP;
    if (u <= 0) return 0;
    if (u >= T) return V * (T - a);
    if (u < a) return V * (u / 2 - a / TAU * Math.sin(Math.PI * u / a));
    if (u < T - a) return V * a / 2 + V * (u - a);
    const r = T - u; return V * (T - a) - V * (r / 2 - a / TAU * Math.sin(Math.PI * r / a));
  }
  function rampSpeed(u, T) {
    const a = T_RAMP;
    if (u <= 0 || u >= T) return 0;
    if (u < a) return V_WALK * (1 - Math.cos(Math.PI * u / a)) / 2;
    if (u > T - a) return V_WALK * (1 - Math.cos(Math.PI * (T - u) / a)) / 2;
    return V_WALK;
  }
  function kin(S, T) {
    const n = Math.floor(T / S.P), tl = T - n * S.P;
    let seg = S.segs[S.segs.length - 1];
    for (const s of S.segs) if (tl < s.t1) { seg = s; break; }
    let x = seg.x0, v = 0;
    if (seg.walk) { const u = tl - seg.t0; x += rampDist(u, seg.T); v = rampSpeed(u, seg.T); }
    x += n * S.Lw;
    const w = sm(Math.min(1, v / (V_WALK * .6)));
    const ph = x / S.cyc;
    const hy = lerp(RIG.hip, 75 + 2 * Math.cos(TAU * 2 * (wrap(ph, 1) - .3)), w);
    return { x, v, w, ph, tl, n, hy };
  }
  // Ankerpunkt über und hinter dem Kopf: dort schweben mitgenommene Erkenntnisse.
  function anchorAt(S, T) {
    const k = kin(S, T);
    return [k.x - 22, k.hy + RIG.torso + RIG.headGap + 30];
  }
  function fly(a, b, p, h) {
    const e = eio(p), q = 1 - e;
    const cx = (a[0] + b[0]) / 2, cy = Math.max(a[1], b[1]) + h;
    return [q * q * a[0] + 2 * q * e * cx + e * e * b[0], q * q * a[1] + 2 * q * e * cy + e * e * b[1]];
  }

  /* ---------- Stationsinhalte ---------- */
  // Tafel (relativ zur Tafelmitte): verstreute Notizen, danach nach Themen gruppiert.
  const SCAT = [[-66, 34], [-8, -30], [40, 26], [78, -14], [-38, -6], [10, 44], [58, -44], [-74, -40]];
  const COLS = [0, 1, 1, 2, 0, 1, 2, 0];
  const CLUS = [[-55, -10], [0, -10], [0, -30], [55, -10], [-55, -30], [0, -50], [55, -30], [-55, -50]];
  const CHILD = [[-55, 14], [0, 14], [55, 14]];
  // Struktur (relativ zu ihrem Zentrum): Wurzel und drei Knoten.
  const SNODES = [[0, 16, 44, 12], [-55, -16, 38, 12], [0, -16, 38, 12], [55, -16, 38, 12]];
  // Screen-Blöcke (relativ zur Phone-Mitte): Titel, Bild, Zeile, Zeile. Button extra.
  const BLK = [[-10, 64, 44, 7], [0, 30, 70, 46], [0, -30, 70, 18], [0, -54, 70, 18]];
  const BTN = [0, -6, 70, 13];

  function scene(S, T) {
    const k = kin(S, T), tl = k.tl, P = S.P;
    const loc = s => {
      const u = wrap(tl - s.arrive + P / 2, P) - P / 2;
      const m = k.n + Math.round((tl - s.arrive - u) / P);
      const i = sm(rng(u, -3.2, -1.4)), o = sm(rng(u, s.stay + .6, s.stay + 2.4));
      return { u, x: s.base + m * S.Lw, stay: s.stay, pin: i, pout: o, a: i * (1 - o) };
    };
    const R = loc(S.R), C = loc(S.C), D = loc(S.D);
    const uR = R.u, uC = C.u, uD = D.u;
    const sc = { T, k, R, C, D, users: [], tester: null, bubbles: [], dots: [], notes: [], struct: null, phone: null };

    /* Person */
    const gs = [
      { k: env(uR, .1, .6, 1.8, 2.4), a: 32, e: 72 },                              // fragt
      { k: env(uC, -.1, .5, 1.3, 1.9), tx: C.x - 66, ty: 134 },                    // zeigt auf die Tafel
      { k: env(uC, 4.9, 5.4, 5.9, 6.5), a: 132, e: 26 },                           // nimmt die Struktur
      { k: env(uD, -.1, .5, 1.4, 2.0), tx: D.x - 50, ty: 128 },                    // präsentiert
    ];
    const gN = gs.reduce((m, g) => (g.k > m.k ? g : m), { k: 0 });
    const nod = pulse(uR, 2.85, .5) + pulse(uR, 3.95, .5) + pulse(uC, 4.2, .5) + pulse(uD, 5.95, .5);
    sc.walker = pose({ x: k.x, dir: 1, w: k.w, ph: k.ph, cyc: S.cyc, t: T, gN, nod });

    /* Nutzende */
    if (R.a > .002) {
      const wave = env(uR, R.stay - .7, R.stay - .2, R.stay + 1.3, R.stay + 1.9);
      const ex1 = env(uR, 2.2, 2.6, 3.3, 3.8), ex2 = env(uR, 3.0, 3.4, 4.1, 4.6);
      const g2 = wave > ex2 ? { k: wave, a: 148, e: 24 + 16 * Math.sin(T * TAU * 1.6) } : { k: ex2, a: 22, e: 50 };
      sc.users.push({ a: R.a, J: pose({ x: R.x + ST.r.u2, dir: -1, s: 1.03, t: T, seed: 2.6, nod: pulse(uR, 1.1, .5), gN: g2 }) });
      sc.users.push({ a: R.a, hair: true, J: pose({ x: R.x + ST.r.u1, dir: -1, s: .95, t: T, seed: 1.3, nod: pulse(uR, .9, .5), gN: { k: ex1, a: 18, e: 54 } }) });
    }
    if (D.a > .002) {
      sc.tester = { a: D.a, hair: true, J: pose({ x: D.x + ST.d.tester, dir: -1, s: .95, t: T, seed: 4.1, nod: pulse(uD, 5.6, .5), gN: { k: env(uD, 3.0, 3.6, 4.15, 4.75), tx: D.x + 14, ty: 110 } }) };
    }

    /* Sprechblasen: nur Zeichen, kein Text */
    // Die Testperson spricht nach außen, damit die Blase den Screen nicht verdeckt.
    const side = J => (J === sc.tester?.J ? -J.dir : J.dir);
    const emit = J => [J.head[0] + side(J) * 22 * J.s, J.head[1] + 64 * J.s];
    const bub = (J, u, t0, t1, glyph, glyph2, tm) => {
      if (!J || u < t0 || u > t1 + .4) return;
      const pin = rng(u, t0, t0 + .5), pout = rng(u, t1, t1 + .35), dir = side(J);
      sc.bubbles.push({
        x: J.head[0] + dir * 13 * J.s, y: J.head[1] + 26 * J.s + 4 * eo(rng(u, t0, t1 + .4)),
        dir, s: back(pin) * (1 - .12 * sm(pout)), a: sm(rng(u, t0, t0 + .16)) * (1 - sm(pout)),
        glyph, glyph2, m: glyph2 ? sm(rng(u, tm, tm + .28)) : 0,
      });
    };
    const U2 = sc.users[0] && sc.users[0].J, U1 = sc.users[1] && sc.users[1].J, TE = sc.tester && sc.tester.J;
    bub(sc.walker, uR, .35, 2.0, '?');
    bub(U1, uR, 1.5, 3.7, '…', '!', 2.3);
    bub(U2, uR, 3.0, 4.4, '!');
    bub(sc.walker, uC, 3.95, 5.0, '!');
    bub(TE, uD, 4.7, 6.1, '!');

    /* Erkenntnisse: Punkte, die mitgenommen werden */
    const Ra = S.R.arrive, Ca = S.C.arrive, Da = S.D.arrive;
    const bc = [C.x + ST.c.bx, ST.c.by];
    const slot = i => {
      const a = anchorAt(S, T - (.1 + .07 * i)), th = T * .55 + i * TAU / 4;
      return [a[0] + Math.cos(th) * 10, a[1] + Math.sin(th) * 5.5 + Math.sin(T * 2.1 + i) * 1.2];
    };
    const DOTS = [
      { inT: Da + 5.0, outT: Ca + .2, src: TE },
      { inT: Ra + 2.45, outT: Ca + .34, src: U1 },
      { inT: Ra + 3.3, outT: Ca + .48, src: U2 },
      { inT: Ra + 3.55, outT: Ca + .62, src: U2 },
    ];
    DOTS.forEach((d, i) => {
      const since = wrap(tl - d.inT, P), dur = wrap(d.outT - d.inT, P);
      let pos = null;
      if (since < .9) { if (d.src) pos = fly(emit(d.src), slot(i), since / .9, 34); }
      else if (since < dur) pos = slot(i);
      else if (since < dur + .8) pos = fly(slot(i), [bc[0] + SCAT[i][0], bc[1] + SCAT[i][1]], (since - dur) / .8, 30);
      if (pos) sc.dots.push(pos);
    });

    /* Tafel: Notizen sortieren sich zu Themen */
    if (C.a > .002) {
      for (let i = 0; i < 8; i++) {
        const ember = i < 4;
        const tA = ember ? [.2, .34, .48, .62][i] + .8 : .95 + (i - 4) * .12;
        if (uC < tA) continue;
        const ap = ember ? eo(rng(uC, tA, tA + .3)) : back(rng(uC, tA, tA + .38));
        const mv = eio(rng(uC, 1.9 + i * .07, 2.8 + i * .07));
        const col = COLS[i];
        const ab = eio(rng(uC, 4.3 + col * .08, 4.85 + col * .08));
        if (ab >= 1) continue;
        let x = lerp(SCAT[i][0], CLUS[i][0], mv), y = lerp(SCAT[i][1], CLUS[i][1], mv) + Math.sin(Math.PI * mv) * 7;
        x = lerp(x, CHILD[col][0], ab); y = lerp(y, CHILD[col][1], ab);
        const size = (ember ? lerp(7, 17, ap) : 17 * ap) * (1 - ab);
        sc.notes.push({ x: bc[0] + x, y: bc[1] + y, size, r: ember ? lerp(3.5, 3, ap) : 3, ember, a: C.a });
      }
    }

    /* Struktur: entsteht auf der Tafel, wird mitgenommen, wird zum Layout */
    const since = wrap(tl - (Ca + 3.0), P), dur = wrap(Da + 1.9 - (Ca + 3.0), P);
    if (since < dur) {
      const aS = () => { const a = anchorAt(S, T - .12); return [a[0] - 2, a[1] + 6]; };
      const boardC = [bc[0], bc[1] + 30];
      let cen, scl = 1, a = 1;
      if (uC < 5.1) { cen = boardC; a = C.a; }
      else if (uC < 6.0) { const f = rng(uC, 5.1, 6.0); cen = fly(boardC, aS(), f, 40); scl = lerp(1, .26, eio(f)); }
      else if (uD < .2) { cen = aS(); scl = .26; }
      else { const f = rng(uD, .2, 1.1); cen = fly(aS(), [D.x, ST.d.py + 12], f, 30); scl = lerp(.26, .95, eio(f)); }
      const mt = i => (uD > -1 ? eio(rng(uD, 1.0 + i * .1, 1.6 + i * .1)) : 0);
      const morph = mt(0);
      const nodeIn = [eo(rng(uC, 3.35, 3.8)), ...[0, 1, 2].map(j => eo(rng(uC, 3.0 + j * .12, 3.45 + j * .12)))];
      const rects = SNODES.map((n, i) => {
        const r = [cen[0] + n[0] * scl, cen[1] + n[1] * scl, n[2] * scl * nodeIn[i], n[3] * scl * nodeIn[i], 3 * scl];
        const mi = mt(i);
        if (mi > 0) {
          const b = BLK[i], tg = [D.x + b[0], ST.d.py + b[1], b[2], b[3], 3];
          for (let j = 0; j < 5; j++) r[j] = lerp(r[j], tg[j], mi);
        }
        return r;
      });
      sc.struct = { cen, scl, a, rects, conn: rng(uC, 3.55, 4.25), morph, nodeIn };
    }

    /* Screen: Wireframe, Gestaltung, Prototyp */
    if (D.a > .002) {
      sc.phone = {
        x: D.x, y: ST.d.py, a: D.a, pin: D.pin, pout: D.pout,
        wire: uD >= 1.9,
        hifi: [0, 1, 2, 3].map(i => eio(rng(uD, 2.0 + i * .12, 2.7 + i * .12))),
        btn: rng(uD, 2.4, 2.95), txt: rng(uD, 2.3, 3.0),
        press: pulse(uD, 3.62, .32), ripple: rng(uD, 3.7, 4.5),
        slide: eio(rng(uD, 3.95, 4.65)), ring: rng(uD, 4.3, 4.85), check: rng(uD, 4.6, 5.1),
        tap: [D.x + 14, 110],
      };
    }
    return sc;
  }

  // Blickpunkt der Kamera: die Station, an der die Person gerade steht.
  function focusOf(sc) {
    const cand = [[sc.R, 0], [sc.C, 0], [sc.D, -15]];
    let best = cand[0], bd = Infinity;
    for (const c of cand) { const d = Math.abs(clamp(c[0].u, 0, c[0].stay) - c[0].u); if (d < bd) { bd = d; best = c; } }
    return best[0].x + best[1];
  }

  window.EinstiegSzene = {
    TAU, DEG, clamp, lerp, sm, eo, eio, back, rng, wrap,
    RIG, ST, BLK, BTN, V_WALK, buildScript, scene, focusOf,
  };
})();
