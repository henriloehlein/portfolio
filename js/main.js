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
    'pre.role':'UX / UI & Product Designer',
    'nav.work':'Projects','nav.how':'How I work','nav.about':'About','nav.contact':'Contact',
    'hero.avail':'Open to working-student & junior roles 2026','hero.loc':'Ansbach University · Germany',
    'hero.t1':'Design','hero.t2':'on the edge',
    'hero.lede':'I am Henri Löhlein, UX/UI & product designer. I work at the intersection of <em>psychology and technology</em>: how AI, LLMs and adaptive systems change the way people decide, trust and act. My focus is psychology-based mechanics, from research to a tested prototype.',
    'hero.cta':'Get in touch','hero.scroll':'Scroll',
    'subnav.meta':'Bachelor candidate at Syntegon · Ansbach University',
    'tag.approach':'Stance','tag.how':'How I work','tag.work':'Case studies','tag.about':'About','tag.contact':'Contact',
    'chain.1a':'Solutions follow','chain.1b':'needs.','chain.2a':'Needs follow','chain.2b':'empathy.','chain.3a':'And empathy follows','chain.3b':'genuine interest.',
    'approach.note':'Purposeful design only emerges where challenges are met with empathy and functional thinking. That is exactly where my approach begins.',
    'focus.title':'The interplay of <em>psychology</em> and <em>design.</em>',
    'focus.c1.t':'Nudging','focus.c1.d':'Guiding behaviour without pressure or force, at the right time in the right context.',
    'focus.c2.t':'Dark Patterns','focus.c2.d':'Mechanisms that steer users against their own interests. Understood in order to avoid them.',
    'focus.c3.t':'Persuasive Design','focus.c3.d':'Translating models like the Fogg Behavior Model and Self-Determination Theory into real mechanics.',
    'focus.c4.t':'Adaptive AI','focus.c4.d':'How LLMs, generative and adaptive systems shape perception and trust, and how these tools can be used within the design process itself.',
    'work.title':'Projects',
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

  /* ---------- Nav skills line: two phrases loop in an endless type -> hold -> delete ->
     type cycle (MagicUI TypingAnimation's "words + loop" pattern), not part of the data-i18n
     system since the text is revealed/removed character by character rather than swapped as
     one block. Second phrase brings the Syntegon/forwerts/Ansbach affiliation back, just
     rotating through instead of sitting permanently next to the name. */
  const STRIP_WORDS = {
    de: [
      { text: 'User Experience Design · Product Design · Interfacedesign · User Research · Interaktionsdesign', hold: 4200 },
      { text: 'Hochschule Ansbach · Syntegon · forwerts', hold: 3000 }
    ],
    en: [
      { text: 'User Experience Design · Product Design · Interface Design · User Research · Interaction Design', hold: 4200 },
      { text: 'Ansbach University · Syntegon · forwerts', hold: 3000 }
    ]
  };
  let stripGen = 0; // bumped on every (re)start so a stale language's timer chain stops itself

  function applyLang(next) {
    lang = next;
    document.documentElement.lang = next;
    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!DEstore.has(el)) DEstore.set(el, el.innerHTML);
      el.innerHTML = next === 'en' ? (EN[key] ?? DEstore.get(el)) : DEstore.get(el);
    });
    $$('.lang__opt').forEach(o => o.classList.toggle('is-active', o.dataset.lang === next));
    startStripType();
    document.dispatchEvent(new CustomEvent('hl:lang', { detail: next }));
    try { localStorage.setItem('hl-lang', next); } catch (e) {}
  }

  /* Endless type -> hold -> delete -> next-phrase loop into `el`, behind a blinking caret that
     never fades since the element is mid-animation for as long as the loop runs. `myGen` is
     captured once and re-checked before every scheduled step, so switching language (which
     calls this again with a new generation) cleanly kills the previous chain instead of both
     racing into the same element. */
  function typeLoop(el, words, typeSpeed, deleteSpeed) {
    if (!el) return;
    const myGen = ++stripGen;
    if (reduce) { el.textContent = words[0].text; return; }
    // .typeText and .typeCursor share one inline wrapper (not two flex siblings of #typeSkills),
    // so the caret sits directly after the last character in the text flow and wraps onto the
    // last line with it, instead of floating beside the whole centered multi-line block.
    el.innerHTML = '<span class="typeLine"><span class="typeText"></span><span class="typeCursor">|</span></span>';
    const textEl = el.querySelector('.typeText');
    let wi = 0;
    function typeWord(cb) {
      const full = words[wi].text;
      let i = 0;
      (function tick() {
        if (myGen !== stripGen) return;
        textEl.textContent = full.slice(0, i);
        i++;
        if (i <= full.length) setTimeout(tick, typeSpeed); else cb();
      })();
    }
    function deleteWord(cb) {
      const full = textEl.textContent;
      let i = full.length;
      (function tick() {
        if (myGen !== stripGen) return;
        i--;
        textEl.textContent = full.slice(0, i);
        if (i > 0) setTimeout(tick, deleteSpeed); else cb();
      })();
    }
    function cycle() {
      if (myGen !== stripGen) return;
      typeWord(() => {
        if (myGen !== stripGen) return;
        setTimeout(() => {
          if (myGen !== stripGen) return;
          deleteWord(() => {
            if (myGen !== stripGen) return;
            wi = (wi + 1) % words.length;
            setTimeout(cycle, 260);
          });
        }, words[wi].hold);
      });
    }
    setTimeout(cycle, 300);
  }
  function startStripType() {
    const words = STRIP_WORDS[lang] || STRIP_WORDS.de;
    const skillsSr = $('#typeSkillsSr');
    if (skillsSr) skillsSr.textContent = words.map(w => w.text).join('. ');
    typeLoop($('#typeSkills'), words, 26, 16);
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
    const hero = $('#how');
    hero && hero.classList.add('is-ready');
    startRotator();
    startStripType();
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

  /* ---------- Word-Blur-In (gezielt: Überschriften/kurze Zeilen, siehe [data-split] im HTML) ----------
     Läuft rekursiv durch Text-Knoten, lässt verschachtelte <em>/<b> (Gradient-Wörter) unangetastet
     stehen und umhüllt jedes Wort mit einem .bw-Span; --i treibt die gestaffelte Verzögerung in
     css/styles.css. approach__line nutzt zusätzlich data-stagger: der Basis-Index versetzt die
     drei Zeilen zueinander, obendrauf zur bestehenden transitionDelay-Staffelung des Blocks unten. */
  function splitWords(root, base) {
    let i = base || 0;
    (function walk(node) {
      if (node.nodeType === 3) {
        const parts = node.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach(part => {
          if (part === '') return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const span = document.createElement('span');
          span.className = 'bw';
          span.style.setProperty('--i', i++);
          span.textContent = part;
          frag.appendChild(span);
        });
        node.replaceWith(frag);
      } else if (node.nodeType === 1) {
        [...node.childNodes].forEach(walk);
      }
    })(root);
    return i;
  }
  function splitAll() {
    $$('[data-split]').forEach(el => {
      let base = 0;
      if (el.hasAttribute('data-stagger') && el.parentElement) {
        base = $$('[data-stagger]', el.parentElement).indexOf(el) * 5;
      }
      splitWords(el, base);
    });
  }
  splitAll();
  // data-i18n-Elemente ersetzen ihr innerHTML komplett beim Sprachwechsel und würden die
  // .bw-Spans dabei mit wegwerfen, also nach jedem hl:lang neu splitten.
  document.addEventListener('hl:lang', splitAll);

  /* ---------- Reveal on scroll ---------- */
  const revObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('is-in');
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
      // Subnav pills get a stronger pull than other magnetic elements (contact links), and carry
      // their own scale along so the mousemove-driven inline transform doesn't wipe out the
      // hover/is-active zoom from CSS (inline style always beats the stylesheet rule).
      const isNavPill = el.classList.contains('subnav__link');
      const pullX = isNavPill ? 0.4 : 0.25;
      const pullY = isNavPill ? 0.5 : 0.35;
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        const scale = isNavPill ? 1.08 : 1;
        el.style.transform = `translate(${mx * pullX}px,${my * pullY}px) scale(${scale})`;
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

  /* ---------- Year safety + console sign ---------- */
  console.log('%cHenri Löhlein — UX/UI Design', 'font-size:14px;font-weight:600;color:#ff6b5e');
})();
