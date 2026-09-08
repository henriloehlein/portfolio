/* =========================================================
   Henri Löhlein — Portfolio · interactions
   ========================================================= */
(function () {
  'use strict';
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* ---------- i18n dictionary (EN overrides; DE lives in HTML) ---------- */
  const EN = {
    'pre.role':'UX / UI Designer',
    'nav.approach':'Approach','nav.focus':'Interests','nav.work':'Work','nav.about':'About','nav.contact':'Contact',
    'hero.avail':'Open to working-student & junior roles 2026','hero.loc':'Ansbach University · Germany',
    'hero.t1':'Design','hero.t2':'on the edge',
    'hero.lede':'I am Henri Löhlein, UX/UI designer. I work at the intersection of <em>psychology and technology</em>: how AI, LLMs and adaptive systems change the way people decide, trust and act. My focus is psychology-based mechanics, from research to a tested prototype.',
    'hero.cta':'View work','hero.scroll':'Scroll','hero.bubbles':'Projects as bubbles, tap to open',
    'subnav.meta':'Bachelor candidate at Syntegon · Ansbach University',
    'strip.role':'UX/UI Designer','strip.m1':'Bachelor candidate at Syntegon','strip.m2':'Ansbach University',
    'tag.approach':'Stance','tag.focus':'Interests','tag.work':'Selected work','tag.about':'About','tag.contact':'Contact',
    'chain.1a':'Solutions follow','chain.1b':'needs.','chain.2a':'Needs follow','chain.2b':'empathy.','chain.3a':'And empathy follows','chain.3b':'genuine interest.',
    'approach.note':'Purposeful design only emerges where challenges are met with empathy and functional thinking. That is exactly where my approach begins.',
    'focus.title':'The interplay of <em>psychology</em> and <em>design.</em>',
    'focus.c1.t':'Nudging','focus.c1.d':'Guiding behaviour without pressure or force, at the right time in the right context.',
    'focus.c2.t':'Dark Patterns','focus.c2.d':'Mechanisms that steer users against their own interests. Understood in order to avoid them.',
    'focus.c3.t':'Persuasive Design','focus.c3.d':'Translating models like the Fogg Behavior Model and Self-Determination Theory into real mechanics.',
    'focus.c4.t':'Adaptive AI','focus.c4.d':'How LLMs, generative and adaptive systems shape perception and trust, and how these tools can be used within the design process itself.',
    'focus.skills':'Skills & tools',
    'sk.ai1':'AI-assisted prototyping','sk.ai2':'LLMs & generative AI','sk.interface':'Interface Design','sk.interaction':'Interaction Design',
    'sk.research':'UX Research','sk.usability':'Usability Testing','sk.personas':'Personas & Journey Maps','sk.wireframe':'Wireframing & Prototyping',
    'sk.dt':'Design Thinking','sk.concept':'Concept & App Design','sk.workshops':'UX Workshops','sk.team':'Interdisciplinary Teamwork',
    'work.title':'Work',
    'p.steady.role':'Adaptive planning & organisation tool · Concept, UX/UI, Prototype',
    'p.steady.tease':'An app that asks <em>why</em> people fail, and uses psychological mechanics to help them stick to their routines with empathy.',
    'p.milo.role':'AI assistance for older adults · Concept, UX/UI, Prototype',
    'p.milo.tease':'An empathetic, transparent assistant that lowers digital barriers and strengthens independence with technology.',
    'p.cognify.role':'Augmented-reality e-learning platform · Concept, UX/UI',
    'p.cognify.tease':'Discover topics close to everyday life, with AR visualisations, quizzes, thoughtful gamification and a strong community aspect.',
    'p.syntegon.name':'Bachelor Thesis · Syntegon','p.syntegon.role':'Visualisation system for pharma production · Research & Development',
    'p.syntegon.tease':'A mobile system that visualises complex production information so operators are guided safely and decisively.',
    'p.forwerts.name':'forwerts interactive','p.forwerts.role':'Internship semester UX Design · E-commerce, funnel optimisation',
    'p.forwerts.tease':'Screen designs, funnel flows, icons and infographics in an online-shop context, with demonstrably better conversion and drop-off rates.',
    'about.h1':'Psychology & design','about.p1':'Digital interactions shape decisions, habits and emotions. I am interested in the subtle mechanisms behind them, nudging, dark patterns, persuasive design, and the question of where responsible design draws the line between support and manipulation.',
    'about.h2':'Looking ahead','about.p2':'New technologies like AI and adaptive systems shape perception, trust and interaction. I want to understand how, and help shape that movement. My work addresses real problems, grounded in an understanding of how users think, act and feel.',
    'about.h3method':'Method','about.pmethod':'My projects begin with genuine interest in the problem, not with a finished solution. From research and empathy, such as personas, journey maps, interviews and card sortings, I derive psychologically grounded mechanics. They take shape in Figma as modular, clearly hierarchised systems and are sharpened in usability testing with real people.',
    'about.passions':'Passions & interests',
    'contact.t1':'Open to projects that','contact.t2':'solve real','contact.t3':'problems.',
    'footer.rights':'All rights reserved','footer.made':'Rothenburg ob der Tauber, Bavaria','footer.top':'Back to top'
  };
  const ENtags = {
    'Behavioral Design':'Behavioral Design','KI-Assistent':'AI Assistant','Card Sorting':'Card Sorting',
    'Accessibility':'Accessibility','Conversational UI':'Conversational UI','Inclusive Design':'Inclusive Design',
    'AR / Spatial':'AR / Spatial','Gamification':'Gamification','Community':'Community','In Bearbeitung':'In progress',
    'Industrial UX':'Industrial UX','Informationsarchitektur':'Information Architecture','Forschung':'Research','Interdisziplinär':'Interdisciplinary',
    'E-Commerce':'E-Commerce','Conversion':'Conversion','Design-System':'Design System','UX-Workshops':'UX Workshops',
    'Trust & Control':'Trust & Control','Self-Determination Theory':'Self-Determination Theory','Marquee':''
  };
  const DEstore = new Map();
  let lang = 'de';

  function applyLang(next) {
    lang = next;
    document.documentElement.lang = next;
    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!DEstore.has(el)) DEstore.set(el, el.innerHTML);
      el.innerHTML = next === 'en' ? (EN[key] ?? DEstore.get(el)) : DEstore.get(el);
    });
    $$('.lang__opt').forEach(o => o.classList.toggle('is-active', o.dataset.lang === next));
    document.dispatchEvent(new CustomEvent('hl:lang', { detail: next }));
    try { localStorage.setItem('hl-lang', next); } catch (e) {}
  }

  /* ---------- Preloader ---------- */
  const pre = $('#preloader');
  const spans = $$('.preloader__name span');
  spans.forEach((s, i) => s.style.setProperty('--i', i));
  const counter = $('#preCount');
  const dur = reduce ? 200 : 1500;
  let finished = false;
  const t0 = performance.now();
  // cosmetic counter (rAF) — purely visual, never gates content
  (function tick(now) {
    const p = Math.min((now - t0) / dur, 1);
    if (counter) counter.textContent = Math.round(p * 100);
    if (p < 1 && !finished) requestAnimationFrame(tick);
  })(t0);
  // content reveal is driven by timers (run even when rAF is throttled)
  setTimeout(finish, dur);
  setTimeout(finish, dur + 1200); // self-healing fallback
  function finish() {
    if (finished) return;
    finished = true;
    if (counter) counter.textContent = '100';
    pre && pre.classList.add('is-done');
    document.body.classList.add('loaded');
    const hero = $('#hero');
    hero && hero.classList.add('is-ready');
    startRotator();
  }

  /* ---------- Custom cursor: smooth spring-follow arrow, rotates to face travel ---------- */
  /* Port of MagicUI's SmoothCursor (position/rotation/scale as damped springs instead of a
     Framer Motion useSpring) since this project has no build step / React runtime. */
  const cursor = $('#cursor');
  const cLabel = $('#cursorLabel');
  if (cursor && !reduce && matchMedia('(any-hover:hover) and (any-pointer:fine)').matches) {
    const spring = (stiffness, damping, mass, v0) => {
      let value = v0, vel = 0, target = v0;
      return { set: t => { target = t; }, tick: dt => {
        const accel = (-stiffness * (value - target) - damping * vel) / mass;
        vel += accel * dt; value += vel * dt; return value;
      } };
    };
    const sx = spring(400, 45, 1, innerWidth / 2);
    const sy = spring(400, 45, 1, innerHeight / 2);
    const srot = spring(300, 60, 1, 0);
    const sscale = spring(500, 35, 1, 1);

    let lastPos = { x: innerWidth / 2, y: innerHeight / 2 }, lastTime = Date.now();
    let prevAngle = 0, accRotation = 0, squishTimer = null;

    addEventListener('pointermove', e => {
      if (e.pointerType === 'touch') return;
      cursor.style.opacity = '1';
      const pos = { x: e.clientX, y: e.clientY };
      const now = Date.now(), dt = now - lastTime || 1;
      const vx = (pos.x - lastPos.x) / dt, vy = (pos.y - lastPos.y) / dt;
      lastTime = now; lastPos = pos;
      sx.set(pos.x); sy.set(pos.y);
      if (Math.hypot(vx, vy) > 0.1) {
        const angle = Math.atan2(vy, vx) * (180 / Math.PI) + 90;
        let diff = angle - prevAngle;
        if (diff > 180) diff -= 360; if (diff < -180) diff += 360;
        accRotation += diff; prevAngle = angle;
        srot.set(accRotation);
        sscale.set(0.95);
        clearTimeout(squishTimer);
        squishTimer = setTimeout(() => sscale.set(1), 150);
      }
    }, { passive: true });

    let last = performance.now();
    (function loop(now) {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const x = sx.tick(dt), y = sy.tick(dt), rot = srot.tick(dt), sc = sscale.tick(dt);
      cursor.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%) rotate(${rot}deg) scale(${sc})`;
      requestAnimationFrame(loop);
    })(last);

    document.documentElement.classList.add('has-custom-cursor');
    const hoverSel = 'a,button,[data-cursor],.project,.fcard';
    document.addEventListener('mouseover', e => {
      const t = e.target.closest(hoverSel);
      if (!t) return;
      const label = t.getAttribute('data-cursor');
      if (label) { cursor.classList.add('is-label'); cLabel.textContent = label; }
      else cursor.classList.add('is-hover');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(hoverSel)) { cursor.classList.remove('is-hover', 'is-label'); cLabel.textContent = ''; }
    });
  }

  /* ---------- Nav scroll state + active link ---------- */
  const nav = $('#nav');
  const subnav = $('#subnav');
  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 60;
  const sections = $$('main section[id]');
  const navLinks = $$('.subnav__link');
  // Nothing reads as "active" while still in the first viewport. currentSectionId tracks whatever
  // the IntersectionObserver last saw regardless of scroll position, applyActive gates it on scrollY
  // so the link lights up the moment the visitor crosses that first screen, without waiting for the
  // next section change to re-fire the observer.
  let currentSectionId = null;
  const applyActive = () => {
    const useId = scrollY < innerHeight ? null : currentSectionId;
    navLinks.forEach(l => l.classList.toggle('is-active', !!useId && l.getAttribute('href') === '#' + useId));
  };
  addEventListener('scroll', () => {
    nav.classList.toggle('is-stuck', scrollY > 30);
    if (subnav) subnav.classList.toggle('is-stuck', subnav.getBoundingClientRect().top <= navH + 2);
    applyActive();
  }, { passive: true });

  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) currentSectionId = en.target.id; });
    applyActive();
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const revObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        const items = en.target.matches('[data-stagger]') ? [en.target] : [en.target];
        items.forEach(el => el.classList.add('is-in'));
        obs.unobserve(en.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  $$('.reveal').forEach((el, i) => {
    if (el.parentElement && el.parentElement.classList.contains('approach__chain')) {
      el.style.transitionDelay = (i % 3) * 0.12 + 's';
    }
    revObs.observe(el);
  });

  /* ---------- Rotator (hero accent word) ---------- */
  const words = ['Unterstützung', 'Begleitung', 'Empathie', 'Vertrauen'];
  const wordsEn = ['support', 'guidance', 'empathy', 'trust'];
  function startRotator() {
    const el = $('#rotator');
    if (!el) return;
    let i = 0;
    const set = () => { el.textContent = (lang === 'en' ? wordsEn : words)[i]; };
    set();
    if (reduce) return;
    setInterval(() => {
      el.style.transition = 'opacity .35s, transform .35s';
      el.style.opacity = '0'; el.style.transform = 'translateY(-30%)';
      setTimeout(() => {
        i = (i + 1) % words.length; set();
        el.style.transition = 'none'; el.style.transform = 'translateY(30%)';
        requestAnimationFrame(() => {
          el.style.transition = 'opacity .4s, transform .4s';
          el.style.opacity = '1'; el.style.transform = 'translateY(0)';
        });
      }, 360);
    }, 2600);
  }

  /* ---------- Magnetic buttons ---------- */
  if (matchMedia('(hover:hover)').matches && !reduce) {
    $$('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${mx * 0.25}px,${my * 0.35}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- Parallax blobs ---------- */
  const blobs = $$('.field__blob');
  if (!reduce) {
    addEventListener('scroll', () => {
      const y = scrollY;
      blobs[0] && (blobs[0].style.transform = `translateY(${y * 0.06}px)`);
      blobs[1] && (blobs[1].style.transform = `translateY(${y * -0.05}px)`);
      blobs[2] && (blobs[2].style.transform = `translate(-50%,${y * 0.04}px)`);
    }, { passive: true });
  }

  /* ---------- Scroll-linked signature gradient (ember -> slate across the whole page) ----------
     One warm->cool arc for the entire scroll, not a different hue per section: --warm-1, --cool-1,
     --pink and --violet (plus --bg-tint, which drives every --head-grad headline) all interpolate
     together from the ember palette at the top to the slate palette at the bottom. The transition
     is centred on the midpoint of the page and spread across most of the scroll distance (WIDTH),
     so it reads as a slow drift rather than a jump. */
  (function initScrollGradient() {
    const root = document.documentElement;
    const EMBER = { '--warm-1': [169, 80, 63], '--cool-1': [91, 87, 84], '--pink': [114, 109, 105], '--violet': [64, 61, 59] };
    const SLATE = { '--warm-1': [63, 90, 134], '--cool-1': [92, 95, 102], '--pink': [109, 112, 121], '--violet': [60, 62, 68] };
    const MID = 0.5, WIDTH = 0.8; // transition centred at 50% of scroll, spans ~80% of the scroll distance
    const smooth = t => t * t * (3 - 2 * t);
    const lerp = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
    const toHex = c => '#' + c.map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('');
    let ticking = false;
    function apply() {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const p = Math.min(1, Math.max(0, scrollY / max));
      const f = smooth(Math.min(1, Math.max(0, (p - (MID - WIDTH / 2)) / WIDTH)));
      Object.keys(EMBER).forEach(k => root.style.setProperty(k, toHex(lerp(EMBER[k], SLATE[k], f))));
      root.style.setProperty('--bg-tint', toHex(lerp(EMBER['--warm-1'], SLATE['--warm-1'], f)));
      ticking = false;
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(apply); } }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll, { passive: true });
    apply();
  })();

  /* ---------- Theme toggle ---------- */
  const themeBtn = $('#themeToggle');
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('hl-theme', t); } catch (e) {}
  }
  themeBtn && themeBtn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    setTheme(cur === 'dark' ? 'light' : 'dark');
  });
  try {
    const saved = localStorage.getItem('hl-theme');
    if (saved) setTheme(saved);
    const sl = localStorage.getItem('hl-lang');
    if (sl) applyLang(sl);
  } catch (e) {}

  /* ---------- Language toggle ---------- */
  $('#langToggle') && $('#langToggle').addEventListener('click', () => applyLang(lang === 'de' ? 'en' : 'de'));

  /* ---------- Interest flip-cards (tap toggle for touch / no-hover) ---------- */
  $$('.fcard').forEach(c => {
    c.addEventListener('click', () => c.classList.toggle('is-flipped'));
    c.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        c.classList.toggle('is-flipped');
      }
    });
  });

  /* ---------- Project modal ---------- */
  const modal = $('#modal');
  const mContent = $('#modalContent');
  const mBarName = $('#modalBarName');
  const mProgress = $('#modalProgress');
  const cases = $('#cases');
  let lastFocus = null;

  function openProject(id) {
    const src = cases.querySelector(`[data-case="${id}"]`);
    if (!src) return;
    mContent.innerHTML = src.innerHTML;
    mContent.setAttribute('data-case', id); // so [data-case="x"] .cs__title accent rules can match once moved
    const nameEl = src.querySelector('.cs__title');
    mBarName.textContent = nameEl ? nameEl.textContent : '';
    lastFocus = document.activeElement;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    mContent.scrollTop = 0;
    mProgress.style.width = '0%';
    setTimeout(() => mContent.focus(), 300);
  }
  function closeProject() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    lastFocus && lastFocus.focus && lastFocus.focus();
  }
  $$('.project').forEach(p => {
    p.addEventListener('click', () => openProject(p.dataset.project));
  });
  $$('[data-close]', modal).forEach(b => b.addEventListener('click', closeProject));
  addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeProject(); });
  mContent && mContent.addEventListener('scroll', () => {
    const max = mContent.scrollHeight - mContent.clientHeight;
    mProgress.style.width = (max > 0 ? (mContent.scrollTop / max) * 100 : 0) + '%';
  }, { passive: true });

  /* ---------- Floating bubbles · viewport-wide drift ---------- */
  (function initBubbles() {
    const field = $('#bubbleField');
    if (!field) return;
    const covers = {
      steady: 'assets/img/covers/steady.png',
      milo: 'assets/img/covers/milo.png',
      cognify: 'assets/img/covers/cognify.png',
      syntegon: 'assets/img/covers/syntegon.jpg',
      forwerts: 'assets/img/covers/forwerts.png'
    };
    const shortName = { steady: 'steady', milo: 'Milo', cognify: 'Cognify', syntegon: 'Syntegon', forwerts: 'forwerts' };
    // per-project category kicker + benefit line (DE / EN)
    const meta = {
      steady:   { kicker: { de: 'Behavioral Design', en: 'Behavioral Design' },
                  benefit: { de: 'Hält Menschen mit psychologischen Mechaniken an ihren Routinen.', en: 'Keeps people on track with psychology-based mechanics.' } },
      milo:     { kicker: { de: 'Inclusive Design · KI', en: 'Inclusive Design · AI' },
                  benefit: { de: 'KI-Assistenz für Senioren, mit Fokus auf Vertrauen und Zugänglichkeit.', en: 'AI assistance for seniors, focused on trust and accessibility.' } },
      cognify:  { kicker: { de: 'AR E-Learning', en: 'AR E-Learning' },
                  benefit: { de: 'Lernen mit Augmented Reality, Quizzes und Gamification.', en: 'Learning with augmented reality, quizzes and gamification.' } },
      syntegon: { kicker: { de: 'Industrial UX · Bachelorarbeit', en: 'Industrial UX · Bachelor thesis' },
                  benefit: { de: 'Visualisierung für die Pharmaproduktion, die Bediener sicher führt.', en: 'Pharma-production visualisation that guides operators safely.' } },
      forwerts: { kicker: { de: 'E-Commerce UX · Praktikum', en: 'E-Commerce UX · Internship' },
                  benefit: { de: 'Funnel- und Screen-Design mit nachweislich besserer Conversion.', en: 'Funnel and screen design with measurably better conversion.' } }
    };

    const data = $$('.project').map(p => ({
      id: p.dataset.project,
      name: shortName[p.dataset.project] || (p.querySelector('.project__name') || {}).textContent || '',
      roleEl: p.querySelector('.project__role'),
      teaseEl: p.querySelector('.project__tease'),
      cover: covers[p.dataset.project]
    })).filter(d => d.cover);
    if (!data.length) return;

    // ---- dedicated preview popup (separate from the drifting bubbles) ----
    const scrim = document.createElement('div');
    scrim.className = 'bubbleScrim';

    const stage = document.createElement('div');
    stage.className = 'bubbleStage';
    stage.innerHTML =
      '<div class="bubblePop" role="dialog" aria-modal="true" aria-label="Projektvorschau">' +
        '<div class="bubblePop__media"><img alt=""></div>' +
        '<div class="bubblePop__body">' +
          '<p class="bubblePop__kicker"></p>' +
          '<h3 class="bubblePop__name"></h3>' +
          '<p class="bubblePop__benefit"></p>' +
          '<p class="bubblePop__tease"></p>' +
        '</div>' +
      '</div>' +
      '<button type="button" class="bubbleLink"><span></span>' +
        '<svg viewBox="0 0 24 24"><path d="M7 17L17 7M9 7h8v8"/></svg></button>';

    document.body.appendChild(scrim);
    document.body.appendChild(stage);

    const pop      = stage.querySelector('.bubblePop');
    const popImg   = stage.querySelector('.bubblePop__media img');
    const popKick  = stage.querySelector('.bubblePop__kicker');
    const popName  = stage.querySelector('.bubblePop__name');
    const popBen   = stage.querySelector('.bubblePop__benefit');
    const popTease = stage.querySelector('.bubblePop__tease');
    const link     = stage.querySelector('.bubbleLink');

    let openId = null;
    scrim.addEventListener('click', close);
    pop.addEventListener('click', e => e.stopPropagation());
    link.addEventListener('click', e => {
      e.stopPropagation();
      const id = openId; close(); if (id) openProject(id);
    });

    const bubbles = [];
    let paused = false;

    // left/right "gutter" bands outside the centered content; bubbles roam here only
    function bands() {
      const vw = innerWidth, maxw = 1320;
      const pad = Math.min(80, Math.max(20, vw * 0.05));
      const bandW = Math.max(pad, (vw - maxw) / 2);
      return { vw, bandW, leftInner: bandW, rightInner: vw - bandW };
    }

    data.forEach((d, i) => {
      const el = document.createElement('div');
      el.className = 'bubble';
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', d.name);
      el.setAttribute('data-cursor', 'Öffnen');
      el.innerHTML =
        '<div class="bubble__media"><img src="' + d.cover + '" alt="" loading="lazy"></div>' +
        '<div class="bubble__glass"></div>';
      field.appendChild(el);

      // varied sizes; gentle drift
      const size = 50 + Math.round(Math.random() * 28);
      const bd = bands();
      const onLeft = (i % 2 === 0);
      const lo = onLeft ? -size * 0.3 : bd.rightInner;
      const hi = onLeft ? (bd.leftInner - size) : (bd.vw - size * 0.7);
      const ang = Math.random() * Math.PI * 2;
      const sp  = 0.08 + Math.random() * 0.10;
      const b = {
        el, id: d.id, name: d.name, roleEl: d.roleEl, teaseEl: d.teaseEl,
        size,
        x: lo + Math.random() * Math.max(1, hi - lo),
        y: 40 + Math.random() * Math.max(40, innerHeight - size - 80),
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp,
        phase: Math.random() * Math.PI * 2,
        bob: 3 + Math.random() * 5,
        // each bubble carries its own "rest opacity" (varied transparency)
        rest: 0.30 + Math.random() * 0.26
      };
      bubbles.push(b);

      el.style.width = el.style.height = size + 'px';
      el.style.opacity = b.rest.toFixed(2);

      el.addEventListener('click', () => open(b));
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(b); }
      });
    });

    function tick() {
      if (!paused) {
        const h = innerHeight, t = performance.now() / 1000, bd = bands();
        bubbles.forEach(b => {
          b.x += b.vx;
          b.y += b.vy;
          // vertical: bounce within the viewport
          if (b.y < 0) { b.y = 0; b.vy = Math.abs(b.vy); }
          else if (b.y > h - b.size) { b.y = h - b.size; b.vy = -Math.abs(b.vy); }
          // horizontal: stay in the side bands, never cross the centre content;
          // exit the outer edge on one side -> re-enter from the other side
          const center = b.x + b.size / 2;
          if (center < bd.vw / 2) {            // left band
            if (b.x + b.size > bd.leftInner) { b.x = bd.leftInner - b.size; b.vx = -Math.abs(b.vx); }
            if (b.x + b.size < 0) b.x = bd.vw; // left out -> right in
          } else {                              // right band
            if (b.x < bd.rightInner) { b.x = bd.rightInner; b.vx = Math.abs(b.vx); }
            if (b.x > bd.vw) b.x = -b.size;     // right out -> left in
          }
          const bob = Math.sin(t * 0.55 + b.phase) * b.bob;
          b.el.style.transform = 'translate(' + b.x + 'px,' + (b.y + bob) + 'px)';
        });
      }
      requestAnimationFrame(tick);
    }
    if (!reduce) requestAnimationFrame(tick);
    // initial paint so they are positioned before the first frame
    bubbles.forEach(b => { b.el.style.transform = 'translate(' + b.x + 'px,' + b.y + 'px)'; });

    function open(b) {
      if (openId) return;
      openId = b.id;
      const m = meta[b.id] || {};
      const cover = covers[b.id];
      if (popImg.getAttribute('src') !== cover) popImg.setAttribute('src', cover);
      popKick.textContent  = m.kicker ? m.kicker[lang] || m.kicker.de : (b.roleEl ? b.roleEl.textContent : '');
      popName.textContent  = b.name;
      popBen.textContent   = m.benefit ? m.benefit[lang] || m.benefit.de : '';
      popTease.innerHTML   = b.teaseEl ? b.teaseEl.innerHTML : '';
      link.querySelector('span').textContent =
        (lang === 'en' ? 'View full project · Case study' : 'Zum ganzen Projekt · Case Study');
      paused = true;
      scrim.classList.add('is-on');
      stage.classList.add('is-on');
    }

    function close() {
      if (!openId) return;
      openId = null;
      scrim.classList.remove('is-on');
      stage.classList.remove('is-on');
      paused = false;
    }

    addEventListener('keydown', e => { if (e.key === 'Escape' && openId) close(); });
  })();

  /* ---------- Skills orbit (CV skills float & bounce) ---------- */
  (function initOrbit() {
    const orbit = $('#orbit');
    if (!orbit) return;
    const chips = $$('.orbit__chip', orbit);
    if (!chips.length) return;
    orbit.classList.add('is-live');
    const items = chips.map(el => ({ el, x: 0, y: 0, vx: 0, vy: 0, hw: 0, hh: 0, r: 0, placed: false }));
    let cx = 0, cy = 0, aMax = 0, bMax = 0;

    function measure() {
      const w = orbit.clientWidth, h = orbit.clientHeight;
      cx = w / 2; cy = h / 2;
      items.forEach((it, i) => {
        const rect = it.el.getBoundingClientRect();
        it.hw = rect.width / 2; it.hh = rect.height / 2;
        it.r = Math.hypot(it.hw, it.hh);
        const a = w / 2 - it.hw - 6, b = h / 2 - it.hh - 6;
        it.aMax = a; it.bMax = b;
        if (!it.placed) {
          const ang = (i / items.length) * Math.PI * 2 + Math.random() * 0.6;
          const rr = 0.45 + Math.random() * 0.45;
          it.x = cx + Math.cos(ang) * a * rr - it.hw;
          it.y = cy + Math.sin(ang) * b * rr - it.hh;
          const va = Math.random() * Math.PI * 2, sp = 0.14 + Math.random() * 0.18;
          it.vx = Math.cos(va) * sp; it.vy = Math.sin(va) * sp;
          it.placed = true;
        }
        it.el.style.transform = 'translate(' + it.x + 'px,' + it.y + 'px)';
      });
    }
    measure();

    if (!reduce) {
      (function loop() {
        items.forEach(it => {
          it.x += it.vx; it.y += it.vy;
          const ccx = it.x + it.hw, ccy = it.y + it.hh;
          const dx = ccx - cx, dy = ccy - cy;
          const a = it.aMax || 1, b = it.bMax || 1;
          const norm = (dx * dx) / (a * a) + (dy * dy) / (b * b);
          if (norm > 1) {
            const gx = dx / (a * a), gy = dy / (b * b), gl = Math.hypot(gx, gy) || 1;
            const nx = gx / gl, ny = gy / gl;
            const dot = it.vx * nx + it.vy * ny;
            it.vx -= 2 * dot * nx; it.vy -= 2 * dot * ny;
            const s = 1 / Math.sqrt(norm);
            it.x = cx + dx * s - it.hw; it.y = cy + dy * s - it.hh;
          }
          it.el.style.transform = 'translate(' + it.x + 'px,' + it.y + 'px)';
        });
        requestAnimationFrame(loop);
      })();
    }

    let rT;
    addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(measure, 200); }, { passive: true });
    document.addEventListener('hl:lang', () => setTimeout(measure, 40));
  })();

  /* ---------- Year safety + console sign ---------- */
  console.log('%cHenri Löhlein — UX/UI Design', 'font-size:14px;font-weight:600;color:#ff6b5e');
})();
