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
    'hero.lede':'Henri Löhlein, UX/UI designer. Crafts digital experiences that address <em>real human needs</em>: grounded in psychology, sharpened by empathy, carried by genuine interest.',
    'hero.cta':'View work','hero.scroll':'Scroll',
    'tag.approach':'Stance','tag.focus':'Interests','tag.work':'Selected work','tag.about':'About','tag.contact':'Contact',
    'chain.1a':'Solutions follow','chain.1b':'needs.','chain.2a':'Needs follow','chain.2b':'empathy.','chain.3a':'And empathy follows','chain.3b':'genuine interest.',
    'approach.note':'Purposeful design only emerges where challenges are met with empathy and functional thinking. That is exactly where my approach begins.',
    'focus.title':'The interplay of <em>psychology</em> and <em>design.</em>',
    'focus.c1.t':'Nudging','focus.c1.d':'Guiding behaviour without pressure or force, at the right time in the right context.',
    'focus.c2.t':'Dark Patterns','focus.c2.d':'Mechanisms that steer users against their own interests. Understood in order to avoid them.',
    'focus.c3.t':'Persuasive Design','focus.c3.d':'Translating models like the Fogg Behavior Model and Self-Determination Theory into real mechanics.',
    'focus.c4.t':'Adaptive AI','focus.c4.d':'How new technologies shape perception, trust and our interaction with the digital world.',
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
    'about.h1':'Psychology & design','about.p1':'I am fascinated by the interplay of psychology and design, especially how digital interactions shape decisions, habits and emotions. I am interested in subtle mechanisms like nudging, dark patterns or persuasive design, and the question of where responsible design can draw the line between support and manipulation.',
    'about.h2':'Looking ahead','about.p2':'I want to understand how new technologies like AI and adaptive systems will lastingly shape our perception, our trust and our interaction with the digital world, and how this movement can be shaped. I design digital experiences that address real problems, grounded in a deep understanding of how users think, act and feel.',
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

  /* ---------- Custom cursor ---------- */
  const cursor = $('#cursor');
  const cLabel = $('#cursorLabel');
  if (cursor && matchMedia('(hover:hover)').matches) {
    let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
    addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    (function loop() {
      cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
      cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
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
  const sections = $$('main section[id]');
  const navLinks = $$('.nav__link');
  addEventListener('scroll', () => {
    nav.classList.toggle('is-stuck', scrollY > 30);
  }, { passive: true });

  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        const id = en.target.id;
        navLinks.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + id));
      }
    });
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

  /* ---------- Mobile menu ---------- */
  const burger = $('#burger');
  const links = $('.nav__links');
  burger && burger.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    document.body.classList.toggle('menu-open', open);
  });
  $$('.nav__link').forEach(l => l.addEventListener('click', () => {
    links.classList.remove('is-open'); document.body.classList.remove('menu-open');
  }));

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
