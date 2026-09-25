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
    'nav.line':'UX/UI & Product Designer · available from October 2026',
    'nav.work':'Projects','nav.about':'Profile','nav.contact':'Contact',
    'intro.title':'UX/UI & Product Designer building interfaces grounded in research and <em>behavioural psychology.</em>',
    'intro.lede':'Bachelor in Visualisation and Interaction in Digital Media at Ansbach University of Applied Sciences, completed September 2026 with a grade of 1.3. Internship semester in e-commerce UX at forwerts interactive, bachelor thesis in Research & Development at Syntegon. From mid-October 2026 I am looking for a role as <strong>Junior UX/UI or Product Designer</strong>.',
    'fact.avail':'Available','fact.avail.v':'from mid-October 2026',
    'fact.mode':'Work setup','fact.mode.v':'on-site, hybrid or remote · willing to relocate',
    'fact.loc':'Based in','fact.loc.v':'Rothenburg ob der Tauber, Germany',
    'intro.cta':'Get in touch',
    'tag.work':'Case studies','tag.about':'Profile','tag.contact':'Contact',
    'work.title':'Projects',
    'p.syntegon.name':'Bachelor Thesis · Syntegon','p.syntegon.role':'Research & Development · Industrial UX · 2026',
    'p.syntegon.tease':'A mobile visualisation system that presents process states to machine operators in pharmaceutical production in an actionable way. Concept for system logic, information architecture and prototype, based on literature research and expert interviews, in collaboration with UX, mechanical and pharma engineering.',
    'p.steady.role':'University project · Behavioral Design · 2025',
    'p.steady.tease':'A planning app for people who fail at their routines. Concept, research and hi-fi prototype in Figma, with mechanics derived from Self-Determination Theory and the Fogg Behavior Model. Card sorting and usability testing with eight participants, then iterated.',
    'p.forwerts.name':'forwerts interactive','p.forwerts.role':'Internship semester UX Design · Heilbronn · 10/2024 to 03/2025',
    'p.forwerts.tease':'Screen designs, funnel flows, icons and infographics for online shops and customer centres. According to the team, conversion and completion rates of the reworked funnel flows went up. Contributed to the concept and preparation of internal UX workshops for partner companies.',
    'p.milo.role':'University project · Inclusive Design · 2025',
    'p.milo.tease':'An AI assistant that makes it easier for older adults to get started with digital technology. Concept, research and prototype focused on trust, control and error tolerance. On-site usability testing with five participants from the target group, then iterated.',
    'p.cognify.role':'University project · AR e-learning · Concept, UX/UI',
    'p.cognify.tease':'An e-learning platform that makes topics accessible in everyday life: AR visualisations, quizzes, gamification and community features as a motivation system. Concept and UX/UI.',
    'profile.h.stations':'Experience','profile.h.focus':'Focus','profile.h.methods':'Methods','profile.h.tools':'Tools','profile.h.lang':'Languages',
    'tl.1.t':'Bachelor thesis, Syntegon','tl.1.d':'Research & Development · visualisation system for pharmaceutical production · grade 1.3',
    'tl.2.t':'Internship semester UX Design, forwerts interactive','tl.2.d':'Heilbronn · e-commerce, funnel flows, design structures, UX workshops',
    'tl.3.w':'until 09/2026','tl.3.t':'Bachelor in Visualisation and Interaction in Digital Media','tl.3.d':'Ansbach University of Applied Sciences · graduated with a grade of 1.3',
    'profile.focus':'Interfaces grounded in behavioural psychology: nudging, persuasive design, Self-Determination Theory and the Fogg Behavior Model as the basis for mechanics that support users instead of manipulating them. Plus the use of AI tools in the design process, from research to prototype.',
    'm.interviews':'Expert interviews','m.ia':'Information architecture','m.ds':'Design systems',
    't.ia':'Information Architecture','t.interviews':'Expert Interviews','t.ai':'AI Assistant',
    't.ds':'Design System','t.workshops':'UX Workshops','t.wip':'In progress',
    'lang.de':'German (native)','lang.en':'English',
    'contact.t1':'Available from','contact.t2':'October 2026.',
    'contact.sub':'Junior UX/UI & Product Designer · on-site, hybrid or remote · willing to relocate',
    'footer.rights':'All rights reserved','footer.made':'Rothenburg ob der Tauber, Bavaria','footer.top':'Back to top'
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

  /* ---------- Custom cursor: smooth spring-follow arrow, rotates to face travel ---------- */
  /* Port of MagicUI's SmoothCursor (position/rotation/scale as damped springs instead of a
     Framer Motion useSpring) since this project has no build step / React runtime. */
  const cursor = $('#cursor');
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
    // Arrow only, no text labels: the pointer grows a little over anything clickable and
    // that is the whole interaction hint.
    const hoverSel = 'a,button,.project';
    document.addEventListener('mouseover', e => {
      if (e.target.closest(hoverSel)) cursor.classList.add('is-hover');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(hoverSel)) cursor.classList.remove('is-hover');
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
  $$('.reveal').forEach(el => revObs.observe(el));

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
  // Rows carry role="button" + tabindex, so they need the keyboard half of a button too:
  // Enter and Space open the case study, Space without preventDefault would scroll the page.
  $$('.project').forEach(p => {
    p.addEventListener('click', () => openProject(p.dataset.project));
    p.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProject(p.dataset.project);
      }
    });
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
