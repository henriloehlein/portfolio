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
    'p.cognify.role':'Augmented-reality learning platform · Concept, UX/UI, AR prototype',
    'p.cognify.tease':'Discover knowledge out of curiosity, with 3D models in augmented reality, quizzes and gamification for lasting motivation.',
    'p.syntegon.name':'Bachelor Thesis · Syntegon','p.syntegon.role':'Visualisation system for pharma production · Research & Development',
    'p.syntegon.tease':'A mobile system that visualises complex production information so operators are guided safely and decisively.',
    'p.forwerts.name':'forwerts interactive','p.forwerts.role':'Client projects for 1&1 and Vattenfall · UX Design',
    'p.forwerts.tease':'Screens, user flows and design structures for online shops, customer portals and websites of major corporations in the telecommunications and energy sectors.',
    'p.cognify.tag1':'Augmented reality','p.cognify.tag2':'Gamification','p.cognify.tag3':'Microlearning','p.cognify.tag4':'Social learning','p.forwerts.tag1':'E-commerce','p.forwerts.tag2':'Self-service portals','p.forwerts.tag3':'Design structures',
    'p.steady.tag1':'Behavioral design','p.steady.tag2':'Nudging','p.steady.tag3':'Adaptive systems','p.steady.tag4':'AI assistance',
    'p.milo.tag1':'Inclusive design','p.milo.tag2':'Accessibility','p.milo.tag3':'Conversational UI','p.milo.tag4':'Trust & control',
    'p.syntegon.tag1':'Industrial UX','p.syntegon.tag2':'Information architecture','p.syntegon.tag3':'Data visualisation',
    'cs.forwerts.kicker':'UX DESIGN · 2024/25',
    'cs.forwerts.sub':'UX Design across client projects',
    'cs.forwerts.pitch':'At <strong>forwerts interactive</strong>, I worked in the UX team on online shops, customer portals and websites for major corporations in the telecommunications and energy sectors.',
    'cs.forwerts.meta.role':'Role','cs.forwerts.meta.period':'Period','cs.forwerts.period':'September 2024 to February 2025','cs.forwerts.meta.clients':'Clients',
    'cs.forwerts.tasks.label':'TASKS','cs.forwerts.tasks.title':'Areas of work',
    'cs.forwerts.t1.title':'Screen design','cs.forwerts.t1.text':'Developing screen designs to the specifications of each client project.',
    'cs.forwerts.t2.title':'User flows','cs.forwerts.t2.text':'Ideation for funnel flows and features, developed visually and with copy suggestions.',
    'cs.forwerts.t3.title':'Design structure','cs.forwerts.t3.text':'Building a design structure for areas of the customer centre.',
    'cs.forwerts.t4.title':'Information architecture','cs.forwerts.t4.text':'Analysing and reconceiving website structures.',
    'cs.forwerts.t5.title':'Visual elements','cs.forwerts.t5.text':'Icons, infographics and badges for the online shop and customer centre.',
    'cs.forwerts.t6.title':'Workshops','cs.forwerts.t6.text':'Preparing screen designs and flows for client workshops.',
    'cs.forwerts.excerpts.label':'PROJECTS','cs.forwerts.excerpts.title':'Excerpts from client projects',
    'cs.forwerts.shop.context':'Order process and accessories',
    'cs.forwerts.shop.task1':'Contributing to user flows in the order process',
    'cs.forwerts.shop.task2':'Optimising the accessories step in the order journey',
    'cs.forwerts.shop.task3':'Developing screen designs and feature ideas',
    'cs.forwerts.shop.flow':'Order process',
    'cs.forwerts.shop.1':'Configure device','cs.forwerts.shop.2':'Choose term','cs.forwerts.shop.3':'Choose plan','cs.forwerts.shop.4':'Consider watch','cs.forwerts.shop.5':'Consider trade-in','cs.forwerts.shop.6':'Add accessories','cs.forwerts.shop.7':'Review basket',
    'cs.forwerts.help.context':'Pages and subpages',
    'cs.forwerts.help.task1':'Concept and revision of pages and subpages',
    'cs.forwerts.help.task2':'Contributing to the information and design structure of the Help Center',
    'cs.forwerts.help.flow':'Page levels',
    'cs.forwerts.help.1':'Landing page','cs.forwerts.help.2':'Topic','cs.forwerts.help.3':'Subtopic','cs.forwerts.help.4':'Help article',
    'cs.forwerts.vattenfall.context':'Website structure and page layouts',
    'cs.forwerts.vattenfall.task1':'Analysing and mapping the existing website structure',
    'cs.forwerts.vattenfall.task2':'Reconceiving structure and page layouts in mockups',
    'cs.forwerts.vattenfall.plans':'Plan pages','cs.forwerts.vattenfall.service':'Service pages',
    'cs.forwerts.vattenfall.1':'Plan overview','cs.forwerts.vattenfall.2':'Plan detail','cs.forwerts.vattenfall.3':'Service overview','cs.forwerts.vattenfall.4':'Service detail',
    'cs.cognify.kicker':'E-Learning · Augmented Reality · 2024',
    'cs.cognify.sub':'Learning platform with augmented reality',
    'cs.cognify.pitch':'<em>Cognify</em> is a learning platform for people who want to acquire new knowledge out of curiosity. Compact courses combine texts, videos and quizzes with augmented reality: printed image markers bring 3D models such as a human heart or the Colosseum straight onto the table. Gamification and community features are meant to sustain motivation over time.',
    'cs.cognify.meta.role':'Role','cs.cognify.role':'Concept · UX research · UX/UI · AR prototype',
    'cs.cognify.meta.methods':'Methods','cs.cognify.methods':'Competitor analysis · Survey · Personas · Journey maps · Usability testing',
    'cs.cognify.meta.context':'Context','cs.cognify.context':'University project · Ansbach University · Summer semester 2024',
    'cs.cognify.s1.title':'Starting point',
    'cs.cognify.s1.p1':'The project began with research into existing learning platforms. Most of them target school, university or professional training and organise their content by subject. Augmented reality apps usually cover a single topic and are mostly aimed at children. For adults who want to explore new topics out of everyday curiosity, no suitable offering could be found.',
    'cs.cognify.s1.p2':'Four apps were tested and rated against the same criteria: Serlo, My Daily Input and Studyflix as broad platforms, and WDR AR 1933-1945 as an example of teaching with AR.',
    'cs.cognify.t.crit':'Criterion','cs.cognify.t.c1':'Design and aesthetics','cs.cognify.t.c2':'Usability','cs.cognify.t.c3':'Personalisation','cs.cognify.t.c4':'Accessibility','cs.cognify.t.c5':'Content quality and scope','cs.cognify.t.c6':'Range of features',
    'cs.cognify.t.caption':'Competitor analysis · Rated from 0 to 5. WDR AR 1933-1945 was rated separately: knowledge transfer 5, AR implementation 4, usability 1.',
    'cs.cognify.s1.p3':'None of the platforms combines personalisation and community, and none scored more than 3 out of 5 for accessibility. The AR app excelled at knowledge transfer but fell short on usability.',
    'cs.cognify.s2.title':'User research',
    'cs.cognify.s2.p1':'An online survey with 20 participants provided data on learning habits, expectations of learning platforms and attitudes towards augmented reality.',
    'cs.cognify.stat1':'name a lack of motivation as the biggest obstacle when learning with platforms',
    'cs.cognify.stat2':'learn with visual media such as images, graphics and videos',
    'cs.cognify.stat3':'average expected benefit of AR; 11 of 20 named concrete use cases',
    'cs.cognify.stat4':'consider a community aspect completely unimportant',
    'cs.cognify.s2.p2':'Opinions on augmented reality were divided. Those who had an idea for its use almost always thought of visualising complex content such as organs, physical processes or technical objects.',
    'cs.cognify.quote':'“With a visual representation, you often don’t just memorise things, you actually understand them.”','cs.cognify.quote.cite':'Survey response',
    'cs.cognify.s2.p3':'The results led to three personas. <strong>Anna Schmidt</strong>, a primary school teacher and mother, is looking for learning resources for her classroom and family. <strong>Michael Hoffmann</strong>, 45 and a tax advisor, wants to explore history, art and philosophy but has little time. <strong>Nicole Lechner</strong>, 23 and a marketing assistant, has plenty of free time but struggles to find the motivation for meaningful activities. She embodies the most common problem from the survey.',
    'cs.cognify.s2.p4':'The user journey map traces Nicole’s path from everyday boredom to a steady learning routine. The decisive moments are the first impression that gets her to try the app and the variety that keeps her engaged afterwards.',
    'cs.cognify.s3.title':'Synthesis and concept',
    'cs.cognify.s3.p1':'The findings were condensed into a guiding statement that shaped all further design work:',
    'cs.cognify.s3.pull':'Users of a learning app with augmented reality value intuitive operation, an appealing interface and a wide range of interactive features. The app should be flexible to use and offer high-quality content.',
    'cs.cognify.s3.h1':'Knowledge packs','cs.cognify.s3.t1':'Compact courses on a single topic form the core. Texts, illustrations, videos, exercises and AR models can be combined according to preference without changing the scope of information.',
    'cs.cognify.s3.t2':'Experience points, levels, achievements and milestones make progress visible and provide regular impulses against fading motivation.',
    'cs.cognify.s3.t3':'A friends list, leaderboards, a forum and groups are meant to add motivation through a sense of community and light competition.',
    'cs.cognify.s3.h4':'Trade-off','cs.cognify.s3.t4':'60 % of respondents considered community unimportant. Since motivation was the most common problem, it remained part of the concept, but with restraint: profiles show interests, levels and achievements, not the scope of a social network.',
    'cs.cognify.s4.title':'From wireframe to interface',
    'cs.cognify.s4.p1':'The lo-fi wireframes served to test ideas early and define the structure. Two principles ran through the entire process: not overwhelming users with information, while still creating an inviting look that does not feel like a mere reference work.',
    'cs.cognify.s4.flow':'Lo-fi and hi-fi compared',
    'cs.cognify.pair1':'Welcome','cs.cognify.pair2':'Home screen','cs.cognify.pair3':'Course preview and learning methods','cs.cognify.pair4':'Course content','cs.cognify.pair5':'Quiz result','cs.cognify.pair6':'Friends',
    'cs.cognify.s4.h':'Key changes in the hi-fi prototype',
    'cs.cognify.s4.b1':'A course preview before every course with a chapter overview and the choice of learning methods',
    'cs.cognify.s4.b2':'Course cards with a percentage instead of a progress bar, plus duration and difficulty',
    'cs.cognify.s4.b3':'An experience points system for completed courses and quizzes, plus a level display showing which friends rank higher or lower',
    'cs.cognify.s4.b4':'Input fields as plain text lines instead of grey boxes; the next arrow stays greyed out until all details are complete',
    'cs.cognify.s4.b5':'A colour scheme from a specialised palette with stronger contrast and clearer colour differences',
    'cs.cognify.s5.title':'Core flows',
    'cs.cognify.s5.p1':'The home screen brings together what matters for everyday learning: the progress bar with level and experience points compared with friends, followed by the lists “Continue learning” and “Discover something new”. Two fixed buttons lead to the community and to search.',
    'cs.cognify.s5.flow1':'Home and discovery','cs.cognify.home1':'Home screen','cs.cognify.home2':'Continue learning','cs.cognify.home3':'Discover something new',
    'cs.cognify.s5.flow2':'A course from preview to result','cs.cognify.course1':'Preview and learning methods','cs.cognify.course2':'Chapter','cs.cognify.course3':'Chapter with AR model','cs.cognify.course4':'Quiz and experience points',
    'cs.cognify.s5.flow3':'Community and profile','cs.cognify.social1':'Friends and ranking','cs.cognify.social2':'Profile','cs.cognify.social3':'Topic preferences',
    'cs.cognify.s6.title':'Augmented reality',
    'cs.cognify.s6.p1':'The AR feature was not only designed but built as a separate Android app with Unity and the Vuforia Engine. The courses “The Human Anatomy” and “The Colosseum” each come with a printable sheet carrying an image marker. Once the camera recognises the marker, the matching 3D model appears on the sheet and can be viewed from every side by moving the device.',
    'cs.cognify.ar1':'Anatomy course · Heart','cs.cognify.ar2':'Colosseum course · Model',
    'cs.cognify.s6.p2':'In the interface, AR is one of five learning methods that can be activated in the course preview, where a printer icon links to the template. Within the course, an icon at the end of the relevant section points to the model.',
    'cs.cognify.s7.title':'Design decisions',
    'cs.cognify.s7.h1':'Familiar patterns','cs.cognify.s7.t1':'According to Jakob’s Law, users expect an app to work like the apps they already know. The logo therefore leads back to the home screen, the profile picture to account and settings, and search sits at the bottom right.',
    'cs.cognify.s7.h2':'Visible progress','cs.cognify.s7.t2':'The progress bar shows level, experience points and friends’ profile pictures. Every quiz is followed by the points gained, a comparison with friends and a ranking among all users.',
    'cs.cognify.s7.h3':'Reduced interface','cs.cognify.s7.t3':'Each screen shows only what is needed for the next step. Profile, settings and community are deliberately kept simple so that less tech-savvy people can find their way around as well.',
    'cs.cognify.s7.h4':'Accessibility','cs.cognify.s7.t4':'The settings offer font size, plain font, a colour blindness mode, video subtitles, a screen reader and a dark mode.',
    'cs.cognify.s8.title':'Evaluation',
    'cs.cognify.s8.p1':'The plan was a quantitative remote evaluation plus three moderated tests. When the prototype was shared, it turned out that Figma required every tester to create an account, and Figma support could not find a solution either. Instead of scaling the evaluation down, the qualitative part was expanded: six testers instead of three and ten tasks instead of five.',
    'cs.cognify.s8.p2':'The tests took place on site, with the prototype on a smartphone plus a tablet and printed sheets for the AR feature. The six participants, aged 22 to 65, differed in tech affinity and AR experience. They thought aloud during the tasks, rated each task for how solvable it was and gave feedback in a closing conversation.',
    'cs.cognify.task1':'Create an account and choose interests','cs.cognify.task2':'Complete the course “The Colosseum” including the quiz','cs.cognify.task3':'Change learning methods within an ongoing course','cs.cognify.task4':'Find friends with a higher and lower level','cs.cognify.task5':'Find achieved milestones','cs.cognify.task6':'Find own position in the global leaderboard','cs.cognify.task7':'Open a friend’s profile','cs.cognify.task8':'Find own groups','cs.cognify.task9':'Change topic preferences','cs.cognify.task10':'Activate dark mode',
    'cs.cognify.bars.caption':'Solvability per task · Average of six ratings from 0 to 10',
    'cs.cognify.score1':'Visual design','cs.cognify.score2':'Learning effect','cs.cognify.score3':'Clarity','cs.cognify.score4':'Ease of use',
    'cs.cognify.score.caption':'Final rating · Average out of 10 points',
    'cs.cognify.s8.h':'Findings',
    'cs.cognify.s8.b1':'All participants completed courses and quizzes with ease. The learning part, the heart of the app, was rated positively throughout.',
    'cs.cognify.s8.b2':'Five of six people initially overlooked the AR feature. The hint sat at the end of the body text and got lost when skimming. Those who used AR found it intuitive; the only obstacle was printing the template.',
    'cs.cognify.s8.b3':'Touch targets were too small for all age groups, partly because of the very precise click areas in the Figma prototype.',
    'cs.cognify.s8.b4':'Changing learning methods within an ongoing course rarely succeeded directly, because nothing indicated the function behind the course title.',
    'cs.cognify.s8.b5':'Older participants missed a visible back arrow and took longer to understand the information architecture. Younger ones transferred familiar patterns from other apps immediately.',
    'cs.cognify.s8.b6':'“Search” was understood as a global search, although it only searches courses.',
    'cs.cognify.s10.title':'Conclusion',
    'cs.cognify.s10.p1':'The derived improvements could not be implemented within the semester, as the project had exceeded its planned scope on several levels, from the custom AR prototype to the expanded evaluation.',
    'cs.cognify.s10.pull':'A unique selling point only works if it is visible in the interface. The AR feature was solved technically but got lost in the body text. Likewise, familiar patterns only carry the people who know them; everyone else needs visible signposts.',
    'about.h1':'Psychology & design','about.p1':'Digital interactions shape decisions, habits and emotions. I am interested in the subtle mechanisms behind them, nudging, dark patterns, persuasive design, and the question of where responsible design draws the line between support and manipulation.',
    'about.h2':'Looking ahead','about.p2':'New technologies like AI and adaptive systems shape perception, trust and interaction. I want to understand how, and help shape that movement. My work addresses real problems, grounded in an understanding of how users think, act and feel.',
    'about.h3method':'Method','about.pmethod':'My projects begin with genuine interest in the problem, not with a finished solution. From research and empathy, such as personas, journey maps, interviews and card sortings, I derive psychologically grounded mechanics. They take shape in Figma as modular, clearly hierarchised systems and are sharpened in usability testing with real people.',
    'about.passions':'Passions & interests',
    'contact.t1':'Open to projects that','contact.t2':'solve real','contact.t3':'problems.',
    'footer.rights':'All rights reserved','footer.made':'Rothenburg ob der Tauber, Bavaria','footer.top':'Back to top'
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
  mContent.addEventListener('click', e => {
    const button = e.target.closest('.cs__flowControls button[data-flow]');
    if (!button) return;
    const flow = mContent.querySelector(`[data-flow-id="${button.dataset.flow}"]`);
    const card = flow && flow.querySelector('.cs__screen');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(flow).gap) || 0;
    flow.scrollBy({ left: Number(button.dataset.dir) * (card.getBoundingClientRect().width + gap), behavior: reduce ? 'auto' : 'smooth' });
  });
  addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeProject(); });
  mContent && mContent.addEventListener('scroll', () => {
    const max = mContent.scrollHeight - mContent.clientHeight;
    mProgress.style.width = (max > 0 ? (mContent.scrollTop / max) * 100 : 0) + '%';
  }, { passive: true });

  /* ---------- Year safety + console sign ---------- */
  console.log('%cHenri Löhlein — UX/UI Design', 'font-size:14px;font-weight:600;color:#ff6b5e');
})();
