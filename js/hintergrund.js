/* =========================================================
   Hintergrund · flüssiges Graphit mit Wasserlicht
   WebGL2: ein Seidenfeld als Relief spiegelt eine weiche Studio-
   Softbox. Von oben rechts fällt ein weicher Lichtkegel ein, in
   dem ein feines Kaustik-Netz liegt; sein Winkel und die Spiegelung
   folgen der geglätteten Scrollposition. Oben rechts kräftig, beim
   Lesen weiter unten ruhiger. Farbton aus --bg-tint (main.js).
   Pausiert im Hintergrund-Tab, Standbild bei reduzierter Bewegung,
   ohne WebGL2 bleibt eine ruhige Fläche (.field--flat).
   ========================================================= */
(function () {
  'use strict';
  const root = document.documentElement;
  const field = document.querySelector('.field');
  const canvas = field && field.querySelector('.field__gl');
  if (!canvas) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Korn: einmal erzeugte, weiche Rauschkachel */
  (function grain() {
    const c = document.createElement('canvas'); c.width = c.height = 180;
    const x = c.getContext('2d'), d = x.createImageData(180, 180);
    for (let i = 0; i < d.data.length; i += 4) {
      const v = (Math.random() + Math.random() + Math.random()) / 3 * 255;
      d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255;
    }
    x.putImageData(d, 0, 0);
    field.style.setProperty('--grain', `url(${c.toDataURL()})`);
  })();

  const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) { field.classList.add('field--flat'); return; }

  const FRAG = `#version 300 es
precision highp float;
out vec4 o;
uniform vec2 R; uniform float T; uniform float S; uniform float P; uniform float L;
uniform vec3 C0; uniform vec3 C1; uniform vec3 C2; uniform vec3 C3;
float ign(vec2 p){ return fract(52.9829189 * fract(dot(p, vec2(.06711056, .00583715)))); }
vec3 perm(vec3 x){ return mod((x * 34. + 1.) * x, 289.); }
float snoise(vec2 v){
  const vec4 K = vec4(.211324865405187, .366025403784439, -.577350269189626, .024390243902439);
  vec2 i = floor(v + dot(v, K.yy)); vec2 x0 = v - i + dot(i, K.xx);
  vec2 i1 = x0.x > x0.y ? vec2(1., 0.) : vec2(0., 1.);
  vec4 x12 = x0.xyxy + K.xxzz; x12.xy -= i1; i = mod(i, 289.);
  vec3 p = perm(perm(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));
  vec3 m = max(.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.); m = m * m; m = m * m;
  vec3 x = 2. * fract(p * K.www) - 1.; vec3 h = abs(x) - .5; vec3 a0 = x - floor(x + .5);
  m *= 1.79284291400159 - .85373472095314 * (a0 * a0 + h * h);
  vec3 g; g.x = a0.x * x0.x + h.x * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130. * dot(m, g);
}
/* Seide: zwei Wellensysteme um Mittelpunkte außerhalb des Bildes, leicht verzogen */
float silk(vec2 p, float t){
  vec2 q = p + .2 * vec2(snoise(p * .7 + vec2(t, 0.)), snoise(p * .7 + vec2(3.7, -t)));
  float x1 = length(q - vec2(1.75, 1.25)) * 8. - t * 1.4;
  float x2 = length(q - vec2(-1.6, 2.4)) * 6. + t;
  return mix(.5 + .5 * sin(x1 + .7 * sin(x1)), .5 + .5 * sin(x2 + .7 * sin(x2)), .32);
}
/* Kaustik: Netz aus zwei gegenläufigen Rauschfeldern, Schnittpunkte leuchten stärker */
float caustic(vec2 q, float t){
  q += .35 * vec2(snoise(q * .5 + t * .3), snoise(q * .5 - t * .3 + 3.));
  float c1 = pow(1. - abs(snoise(q + vec2(t, t * .6))), 12.);
  float c2 = pow(1. - abs(snoise(q * 1.3 + vec2(-t * .7, t * .4) + 7.)), 12.);
  return (c1 + c2) * .55 + c1 * c2 * 1.4;
}
void main(){
  vec2 p = (gl_FragCoord.xy - .5 * R) / R.y;
  p.y -= S * .2;
  float asp = R.x / R.y, yTop = 1. - gl_FragCoord.y / R.y;
  vec2 sp = vec2(gl_FragCoord.x / R.y, yTop);            // Bildkoordinaten, y nach unten
  float tf = T * .01;
  float h = silk(p, tf); vec2 e = vec2(.004, 0.);
  vec3 n = normalize(vec3(h - silk(p + e.xy, tf), h - silk(p + e.yx, tf), e.x * 3.));
  vec3 r = reflect(vec3(0., 0., -1.), n);
  r.xy += vec2(.14 * sin(P * .9), .2 * sin(P * .6 + 1.));  // Lichtlauf
  /* Graphit-Softbox */
  float env = smoothstep(-.2, .6, r.y) * .5 + (1. - smoothstep(0., .06, abs(r.y - .22))) * .22
            + pow(max(r.x, 0.), 5.) * .35 + (1. - smoothstep(0., .08, abs(r.x + .35))) * .12 * smoothstep(0., .5, r.y);
  /* weicher Lichtkegel von oben rechts, sein Winkel schwenkt mit */
  float th = .55 + .12 * sin(P * .6);
  vec2 dir = vec2(-sin(th), cos(th)), d = sp - vec2(asp * .95, -.15);
  float along = dot(d, dir), across = dot(d, vec2(dir.y, -dir.x)), w = .08 + .4 * max(along, 0.);
  float beam = (1. - smoothstep(w * .35, w, abs(across))) * smoothstep(0., .25, along) * exp(-along * .7);
  env += beam * (.12 + .14 * dot(n.xy, vec2(sin(th), cos(th))));
  /* Wasserlicht: nur oben rechts und im Kegel */
  float corner = smoothstep(1.5, .2, length(sp - vec2(asp * .85, -.05)));
  env += caustic(r.xy * 1.5 + p * .85, T * .032) * .3 * smoothstep(.15, .65, env) * smoothstep(-.4, .4, r.y) * max(corner * .35, beam);
  vec3 col = mix(C3, C1, clamp(env, 0., 1.));
  col = mix(col, C2, clamp((env - .62) * 1.8, 0., 1.));
  float corner2 = smoothstep(2.3, .1, length(sp - vec2(asp * .9, -.1)));
  float mask = (1. - .7 * smoothstep(.4, 1.8, S + yTop * .6)) * mix(L > .5 ? .55 : .3, 1., corner2);
  o = vec4(mix(C0, col, mask) + (ign(gl_FragCoord.xy) - .5) / 127.5, 1.);
}`;
  const VERT = `#version 300 es
in vec2 a; void main(){ gl_Position = vec4(a, 0., 1.); }`;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.bindAttribLocation(prog, 0, 'a'); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { field.classList.add('field--flat'); return; }
  gl.useProgram(prog);
  const u = {}; ['R', 'T', 'S', 'P', 'L', 'C0', 'C1', 'C2', 'C3'].forEach(k => u[k] = gl.getUniformLocation(prog, k));
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  /* Farben (sRGB 0..1): Grund, Metall, Glanz, Tiefe; im Dunkeln leicht im Scroll-Ton */
  const C = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
  const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
  function palette(light) {
    const t = (root.style.getPropertyValue('--bg-tint') || '').trim();
    const tint = C(/^#[0-9a-f]{6}$/i.test(t) ? t : '#a9503f');
    return light ? [C('#f6f4f1'), C('#ebe8e4'), C('#ffffff'), C('#cdc6bf')]
                 : [C('#0a0a0f'), mix(C('#2e2e35'), tint, .06), mix(C('#fff1e4'), tint, .12), C('#060608')];
  }

  // Schmale Bildschirme: etwas gröber und mit etwa 30 statt 60 Bildern pro Sekunde
  const small = matchMedia('(max-width: 760px)');
  const ease = (a, dt) => 1 - Math.pow(1 - a, dt / 33);
  let lag = scrollY / innerHeight, last = 0, prev = 0;

  function draw(now) {
    const s = small.matches ? .5 : .6;
    const w = Math.round(innerWidth * s), h = Math.round(innerHeight * s);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
    const dt = Math.min(100, prev ? now - prev : 33); prev = now;
    const sNow = scrollY / innerHeight;
    lag = reduce ? sNow : lag + (sNow - lag) * ease(.045, dt);  // das Licht gleitet der Position weich nach
    const light = root.getAttribute('data-theme') === 'light';
    gl.uniform2f(u.R, w, h);
    gl.uniform1f(u.T, reduce ? 40 : now / 1000);
    gl.uniform1f(u.S, sNow);
    gl.uniform1f(u.P, lag);
    gl.uniform1f(u.L, light ? 1 : 0);
    palette(light).forEach((c, i) => gl.uniform3fv(u['C' + i], c));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden || now - last < (small.matches ? 33 : 15)) return;
    last = now;
    draw(now);
  }
  const once = () => draw(performance.now());
  if (reduce) {
    addEventListener('scroll', () => requestAnimationFrame(once), { passive: true });
    addEventListener('resize', once, { passive: true });
    new MutationObserver(once).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  } else requestAnimationFrame(frame);
  once(); // erstes Bild sofort, damit die Fläche nicht leer einblendet
  canvas.addEventListener('webglcontextlost', () => field.classList.add('field--flat'));
  setTimeout(() => field.classList.add('is-ready'), 60);
})();
