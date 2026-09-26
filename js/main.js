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
    'p.syntegon.tease':'A visualisation system that guides operators in pharmaceutical production step by step and catches errors before they have consequences.',
    'p.forwerts.name':'forwerts interactive','p.forwerts.role':'Client projects for 1&1 and Vattenfall · UX Design',
    'p.forwerts.tease':'Screens, user flows and design structures for online shops, customer portals and websites of major corporations in the telecommunications and energy sectors.',
    'p.cognify.tag1':'Augmented reality','p.cognify.tag2':'Gamification','p.cognify.tag3':'Microlearning','p.cognify.tag4':'Social learning','p.forwerts.tag1':'E-commerce','p.forwerts.tag2':'Self-service portals','p.forwerts.tag3':'Design structures',
    'p.steady.tag1':'Behavioral design','p.steady.tag2':'Nudging','p.steady.tag3':'Adaptive systems','p.steady.tag4':'AI assistance',
    'p.milo.tag1':'Inclusive design','p.milo.tag2':'Accessibility','p.milo.tag3':'Conversational UI','p.milo.tag4':'Trust & control',
    'p.syntegon.tag1':'Industrial UX','p.syntegon.tag2':'HMI design','p.syntegon.tag3':'Error prevention',
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
    'cs.meta.role':'Role','cs.meta.methods':'Methods','cs.meta.context':'Context',
    'cs.steady.kicker':'Behavioral design · 2025',
    'cs.steady.sub':'Adaptive planning and organisation tool',
    'cs.steady.pitch':'<em>steady</em> is a planning app that does more than organise tasks: it helps people stick to their routines and goals. An AI assistant adapts the tone, timing and kind of its support to each user type and steps in when it matters in everyday life.',
    'cs.steady.role':'Concept · UX research · UX/UI · Prototype',
    'cs.steady.methods':'Literature review · Competitor analysis · Personas · Card sorting · Usability testing',
    'cs.steady.context':'University project · Ansbach University · Summer semester 2025',
    'cs.steady.s1.title':'Starting point',
    'cs.steady.s1.p1':'Planning apps such as Notion or a calendar structure tasks but barely change behaviour. The idea grew out of personal experience: despite digital order, it was hard to pursue long-term goals consistently. At the same time, friends showed how little it often takes for people to question a habit, such as a short pause before opening an app.',
    'cs.steady.s1.p2':'This led to the question of how a planning tool can support people in following through without patronising them. A system that is too strict creates pressure, and people who feel controlled delete the app. In mid-May 2025 the approach therefore changed fundamentally:',
    'cs.steady.s1.before':'First approach',
    'cs.steady.s1.beforeText':'Individual discipline mechanics appear at fixed moments, for example when a goal is postponed or deleted. The reaction is always the same, regardless of mood and situation, and can feel preachy.',
    'cs.steady.s1.after':'Revised approach',
    'cs.steady.s1.afterText':'An AI assistant becomes the central control layer. It uses mechanics such as reminding people of their own reasons situationally, matched to timing, context and user type.',
    'cs.steady.s2.title':'Psychological foundation',
    'cs.steady.s2.p1':'Four models from the literature review formed the foundation. Each was translated into a concrete requirement for the app.',
    'cs.steady.s2.m1':'Autonomy, competence and relatedness sustain motivation. Users choose their own goals, progress is always visible, and the assistant accompanies them in dialogue.',
    'cs.steady.s2.m2':'Behaviour happens when motivation, ability and a prompt come together. steady simplifies tasks instead of only pushing, and pays attention to the right moment for a prompt.',
    'cs.steady.s2.src3':'Meta-analysis, Mertens et al., 2022',
    'cs.steady.s2.m3':'Structural nudges such as defaults and ordering have the strongest effect. The app works with preselected categories and a clear order of information. It uses commitment mechanics sparingly.',
    'cs.steady.s2.t4':'Adaptive systems',
    'cs.steady.s2.m4':'Automatic adaptation needs transparency and control. Users see their user type, understand the adaptations and can change them at any time.',
    'cs.steady.s3.title':'User types instead of a target group',
    'cs.steady.s3.p1':'The app is meant to address every person individually. Internally, the system weighs fine-grained dimensions such as motivation style, structuring behaviour and frustration tolerance. The onboarding reduces this to three understandable questions.',
    'cs.steady.s3.c1':'Motivation','cs.steady.s3.c1t':'Achievement, routine or reward',
    'cs.steady.s3.c2':'Approach to tasks','cs.steady.s3.c2t':'Planned, flexible or chaotic',
    'cs.steady.s3.c3':'Support style','cs.steady.s3.c3t':'Gentle, direct, emotional or rational',
    'cs.steady.s3.c4':'Result','cs.steady.s3.c4t':'The user type, changeable at any time',
    'cs.steady.s3.p2':'Only the tone, timing and mechanics of support adapt. Navigation, interface and core features stay the same for everyone, so the app remains reliable to use.',
    'cs.steady.s4.p1':'Three personas represent different patterns: <strong>Maria</strong>, the exhausted everyday hero, <strong>Anna</strong>, the structured self-optimiser, and <strong>Ben</strong>, the creative chaotic.',
    'cs.steady.s4.p2':'Personas and journey maps were deliberately created without reference to the app, to understand people independently of a solution. Only the use cases transferred the findings to concrete situations.',
    'cs.steady.s4.journey':'User journey map · Maria, from overload to relief',
    'cs.steady.uc.tag':'Use case · Maria makes yoga part of her routine',
    'cs.steady.uc.h1':'Goal setting and planning','cs.steady.uc.h2':'Implementation','cs.steady.uc.h3':'Setback',
    'cs.steady.uc.p1':'Maria wants to add yoga to her routines and understand what it does for her. She still doubts she can keep it up. <b>Ideal support:</b> reflective questions such as “What are your biggest fears?” and reflecting together later on. She needs a lot of emotional support.',
    'cs.steady.uc.p2':'Yoga is in her calendar three times a week. Her everyday life is often unpredictable; when she falls out of rhythm, frustration sets in. <b>Ideal support:</b> empathetic reminders, visible progress and easy tracking of routines.',
    'cs.steady.uc.p3':'Everyday pressure feels overwhelming, a negative inner monologue paralyses her. <b>Ideal support:</b> mindful reactions, reflective prompts such as “What would you advise a friend?” and the option to pause, simplify or reprioritise goals.',
    'cs.steady.s4.pull':'An intervention only feels like support when it fits the situation. Otherwise it is experienced as patronising.',
    'cs.steady.s5.title':'Information architecture',
    'cs.steady.s5.p1':'Before the hi-fi prototype, a combined card sort with four people aged 24 to 65 tested the planned structure. In the closed part they sorted 22 terms into six areas of the app; in the open part they marked unclear terms and suggested alternatives.',
    'cs.steady.s5.p2':'The basic structure was confirmed. What remained unclear was how entries were separated: “task” and “routine task” sounded almost the same, and tasks could not be clearly assigned to any area.',
    'cs.steady.s5.before':'Before','cs.steady.s5.after':'After',
    'cs.steady.s5.task':'Task','cs.steady.s5.appt':'Appointment','cs.steady.s5.sub':'Sub-goal','cs.steady.s5.sub2':'Sub-goal','cs.steady.s5.sub3':'Sub-goal',
    'cs.steady.s5.cal':'Calendar entry','cs.steady.s5.routine':'Routine task','cs.steady.s5.routine2':'Routine task','cs.steady.s5.routine3':'Routine task','cs.steady.s5.cal2':'Calendar entry',
    'cs.steady.s5.caption':'Entry types before and after the card sort · colours as in the interface',
    'cs.steady.s5.p3':'Task and appointment were merged into the calendar entry. The three entry types carry a fixed colour throughout the interface and can also be created via a global add overlay that preselects the matching category depending on the current area.',
    'cs.steady.s6.title':'Key screens',
    'cs.steady.a1.h':'Contextual greeting','cs.steady.a1.p':'The greeting adapts to the time of day. On the dashboard, the assistant sits prominently next to it and invites conversation.',
    'cs.steady.a2.h':'Quick overview','cs.steady.a2.p':'The next entry can be ticked off right when the app opens. Below it are the completed entries and the day’s backlog.',
    'cs.steady.a3.h':'Daily schedule','cs.steady.a3.p':'Entries are colour-coded by type, reordered by dragging and completed with a swipe. Overdue entries move to the bottom.',
    'cs.steady.b1.h':'Calculated progress','cs.steady.b1.p':'The progress of the main goal is calculated automatically from its sub-goals. Every change immediately shows its effect.',
    'cs.steady.b2.h':'Priority levels','cs.steady.b2.p':'Coloured lines separate priorities. When a sub-goal is dragged across a line, it takes on that level. Progress is set with a slider in repetition steps.',
    'cs.steady.b3.h':'Completion as a level','cs.steady.b3.p':'Completed sub-goals move to the lowest level and remain visible. Looking back on what has been achieved is an added reward.',
    'cs.steady.s6.p1':'Outside the dashboard, the assistant sits as an icon in the bottom right corner, within natural thumb reach. A sidebar leads to the daily schedule, goals, calendar, settings and help.',
    'cs.steady.s7.title':'The assistant as a companion',
    'cs.steady.s7.p1':'All mechanics run through the assistant rather than separate overlays. So that it does not feel like a pop-up, it reacts with a delay in the prototype, for example when an area is opened or an action is completed. This creates the impression of a companion that is there of its own accord.',
    'cs.steady.m1.t':'Dashboard','cs.steady.m1.p':'Maria declines the suggestion to do some exercises. The assistant proposes pausing two goals so she can focus on herself.',
    'cs.steady.m2.t':'Goals','cs.steady.m2.p':'It praises her progress and suggests a message to her future self, meant to motivate her during a weaker phase.',
    'cs.steady.m3.t':'Weekly review','cs.steady.m3.p':'It asks why the week went so well. From Maria’s answer it derives a gratitude exercise and, on request, creates the matching entry.',
    'cs.steady.s7.p2':'The choice of words follows the same stance. The German copy uses the equivalent of “How can I support you?” rather than “How can I help you?”, stressing a shared process instead of a hierarchy.',
    'cs.steady.s7.flow':'Introduction by the assistant',
    'cs.steady.tour1':'Introduction','cs.steady.tour2':'Quick overview','cs.steady.tour3':'Schedule and colours','cs.steady.tour4':'Main goal and sub-goals','cs.steady.tour5':'Sidebar','cs.steady.tour6':'Calendar',
    'cs.steady.s8.title':'Visual design',
    'cs.steady.s8.colors':'Colour system','cs.steady.s8.progress':'Progress','cs.steady.s8.gradient':'Gradient',
    'cs.steady.s8.d1':'Grid','cs.steady.s8.d1t':'8 px grid, four columns, components built with auto layout',
    'cs.steady.s8.d2':'Typeface','cs.steady.s8.d2t':'Nunito Sans, calm and highly legible',
    'cs.steady.s8.d3t':'One outline set at 24 px. Filled icons were dropped early because they overloaded the screens.',
    'cs.steady.s8.d4':'Gradients','cs.steady.s8.d4t':'A signature element, inspired by the competitor analysis. In the settings they can be replaced by calmer colour modes.',
    'cs.steady.s8.p1':'Warm accents in red and yellow stand for care, blue for clarity. After feedback from supervision, the logo was set bolder, the arrow in the “y” was removed, and it adopted the app’s gradient.',
    'cs.steady.s9.title':'Evaluation',
    'cs.steady.s9.p1':'Eight people aged 22 to 65 tested the hi-fi prototype with ten tasks and questions, five of them accompanied on site on a smartphone and three unaccompanied in the browser. They were selected by age, tech affinity and experience with planning apps.',
    'cs.steady.task1':'Create a main goal','cs.steady.task2':'Open the annual review','cs.steady.task3':'View your user type','cs.steady.task4':'Add a routine task',
    'cs.steady.avg1':'9.5','cs.steady.avg2':'9.8','cs.steady.avg3':'10.0','cs.steady.avg4':'7.0',
    'cs.steady.strip.caption':'Feasibility per task from 0 to 10 · each dot is one person, average on the right',
    'cs.steady.q1':'“The app is kept simple, so it’s hard to lose track.”','cs.steady.q1c':'Participant, 26, student',
    'cs.steady.q2':'“Helpful, but also partly annoying, because it often pops up unasked.”','cs.steady.q2c':'Participant, 24, student, on the assistant',
    'cs.steady.s9.h':'Findings',
    'cs.steady.s9.b1':'Layout and visual design were consistently described as clear, modern and motivating, exactly the aim of the reduced interface.',
    'cs.steady.s9.b2':'Everyone took the assistant’s introduction seriously. Less tech-savvy participants later recalled its hints specifically.',
    'cs.steady.s9.b3':'The two oldest participants struggled to add a routine task, and one gave up. The selection in the add overlay also behaved inconsistently in the prototype.',
    'cs.steady.s9.b4':'For some, the assistant appeared too often. Its activity was set to Maria’s “high” setting in order to show many interactions in a short time.',
    'cs.steady.s9.b5':'Wishes for later: voice control, links to other apps and gamification such as streaks.',
    'cs.steady.s9.newScreen':'New after testing: the created goal shown directly in the overview',
    'cs.steady.s9.h2':'Revisions',
    'cs.steady.s9.c1':'Fixed broken connections in the prototype','cs.steady.s9.c2':'Larger close button in the assistant chat','cs.steady.s9.c3':'Voice input via a microphone button','cs.steady.s9.c4':'Stabilised add overlay, the selection no longer jumps','cs.steady.s9.c5':'Confirmation screen after creating a main goal','cs.steady.s9.c6':'Overlays close when tapping outside',
    'cs.steady.s10.title':'Conclusion',
    'cs.steady.s10.p1':'The shift to the assistant and the restructuring after the card sort are what turned the concept into what was finally tested. Both grew out of setbacks in the process. The criticism of an overly present assistant is answered by the concept itself: its activity is adjustable.',
    'cs.steady.s10.pull':'In steady, it is not the interface that adapts but the support. The structure stays reliable, while the tone and timing of support follow the person.',
    'cs.milo.kicker':'Inclusive design · 2025/26',
    'cs.milo.sub':'AI assistance for older adults',
    'cs.milo.pitch':'<em>Milo</em> is an AI-based assistant that gives older and less tech-savvy people a calm entry into artificial intelligence. A single conversation thread, three selectable input methods and consistent feedback are meant to reduce uncertainty and strengthen independence.',
    'cs.milo.role':'Concept · UX research · UX/UI · Prototype',
    'cs.milo.methods':'Literature review · Market analysis · Personas · Journey maps · Use cases · Usability testing',
    'cs.milo.context':'University project · Ansbach University · Winter semester 2025/26',
    'cs.milo.s1.title':'Starting point',
    'cs.milo.s1.p1':'For many older people, the biggest hurdle is not operation but mindset: the fear of doing something wrong or breaking something, distrust of opaque technology and the feeling of having missed the boat. On top of that come declining eyesight, fine motor skills and attention.',
    'cs.milo.s1.p2':'The market analysis found no application that implements AI assistance specifically for this group. Products such as Hallo Alfred or GrandPad often address relatives first and treat older people as secondary users. This reinforces the very distrust of their independence that makes use difficult.',
    'cs.milo.s1.p3':'The research led to three guiding questions:',
    'cs.milo.q1':'What fears and barriers do older people experience with AI applications?',
    'cs.milo.q2':'Which forms of interaction do they prefer, such as voice or touch?',
    'cs.milo.q3':'How can autonomy and self-efficacy be strengthened in the long term?',
    'cs.milo.s2.title':'Guidelines from the research',
    'cs.milo.l1':'Eyesight','cs.milo.l1t':'Large type, high contrast, generous spacing',
    'cs.milo.l2':'Fine motor skills','cs.milo.l2t':'Large, well-spaced buttons, simple gestures instead of double taps or pinching',
    'cs.milo.l3':'Attention','cs.milo.l3t':'One step per screen, few and slow animations, no sudden pop-ups',
    'cs.milo.l4':'Fear of mistakes','cs.milo.l4t':'Confirmation before critical actions, feedback after every action, undo where possible',
    'cs.milo.l5':'Unfamiliar symbols','cs.milo.l5t':'Labelled buttons and plain language without jargon',
    'cs.milo.l6':'Distrust','cs.milo.l6t':'Transparency about data and costs, human help always within reach, no advertising',
    'cs.milo.s3.title':'Responsibility in tone',
    'cs.milo.s3.p1':'Milo should speak warmly, but must not pretend to have a relationship. Especially for people who experience loneliness, an AI that acts like a friend would be a form of manipulation. Milo therefore makes clear that it is a technical tool and labels recommendations as suggestions.',
    'cs.milo.s3.do':'How Milo speaks','cs.milo.s3.dont':'Deliberately avoided',
    'cs.milo.s3.do1':'“I am your digital assistant and happy to help.”','cs.milo.s3.do2':'“Milo is all of this, artificial intelligence that suits you.”',
    'cs.milo.s3.dont1':'“I was looking forward to our conversation.”','cs.milo.s3.dont2':'“I miss you.”',
    'cs.milo.s3.p2':'The business model follows the same stance: no advertising and a transparently justified premium offer that only appears after some time of use, not at registration.',
    'cs.milo.s4.p1':'Three personas cover the range from cautious to curious: <strong>Inge</strong>, the cautious everyday manager, <strong>Karl</strong>, the sceptical pragmatist with health limitations, and <strong>Monika</strong>, the curious explorer. The prototype follows Inge, who was given a smartphone by her children but hardly uses it.',
    'cs.milo.s4.journey':'User journey map · Inge, from hesitation to independent use · scrolls sideways',
    'cs.milo.uc.tag':'Use case · Inge asks about the weather for the first time',
    'cs.milo.uc.p1':'Inge wants to use the assistant for the first time but does not know how to phrase her question. <b>Ideal support:</b> show how to talk to the AI during onboarding, giving help before a hurdle appears.',
    'cs.milo.uc.p2':'She writes “What will the weather be like tomorrow?” and does not know how to tell whether it worked. <b>Ideal support:</b> present answers unambiguously, visually and verbally, and clearly mark messages from the app as such.',
    'cs.milo.uc.p3':'A reply like “You need to adjust your location first” leaves her feeling powerless. <b>Ideal support:</b> control over the conversation at all times and, when she is confused, a direct route to help.',
    'cs.milo.s5.title':'Concept and structure',
    'cs.milo.s5.p1':'At the centre is a single conversation thread. Many AI apps require users to create and organise chats themselves, an extra hurdle for this audience. Instead, Milo automatically files discussed topics into past conversations at adjustable intervals and then says where to find them. This keeps the active thread short, which also benefits the language model’s answer quality.',
    'cs.milo.ia.core':'Home screen','cs.milo.ia.chat':'Conversation with Milo','cs.milo.ia.chatText':'One central thread that files itself',
    'cs.milo.ia.m1':'Past conversations','cs.milo.ia.m2':'Reminders','cs.milo.ia.m3':'Help','cs.milo.ia.m4':'Settings','cs.milo.ia.m5':'Discover','cs.milo.ia.m5t':'integrated into the conversation',
    'cs.milo.ia.caption':'Information structure · the menu is reachable from anywhere via the header',
    'cs.milo.s5.p2':'A separate “Discover” area for events and offers was dropped because it would have broken the principle of one central assistant. Milo now suggests such content within the conversation, such as a nearby event including a reminder.',
    'cs.milo.s5.p3':'The name is short, easy to pronounce and gender-neutral. “Alfred” from the market analysis felt familiar but would have unintentionally attributed traits to the assistant. Milo can be renamed during onboarding.',
    'cs.milo.s6.title':'An entry without hurdles',
    'cs.milo.s6.loop':'Welcome sequence · recording from the prototype',
    'cs.milo.s6.p1':'The welcome sequence was created late in the process. Discussions with supervision made clear that fear of the first contact was covered in the research but hardly addressed in the interface.',
    'cs.milo.s6.p2':'Everyday images explain what an AI can do: Milo is like a good neighbour, a digital signpost, a huge encyclopaedia and an attentive notepad. Slow transitions leave time to read, and Milo is named as artificial intelligence right from the start.',
    'cs.milo.s6.p3':'The onboarding guides users through six steps covering form of address, input, output, accessibility, devices and privacy, and ends with a summary that can still be changed. Next to the back arrow there is always a labelled button, and the small progress dots have a larger, invisible tap area.',
    'cs.milo.ob1':'Output','cs.milo.ob1t':'Text or answers read aloud',
    'cs.milo.ob2':'Accessibility','cs.milo.ob2t':'Font size and speech rate',
    'cs.milo.ob3':'Devices','cs.milo.ob3t':'Smartwatch and hearing aid',
    'cs.milo.ob4':'Privacy','cs.milo.ob4t':'Every permission with a reason',
    'cs.milo.s7.title':'Three input methods',
    'cs.milo.s7.p1':'Not everyone can or wants to type. During onboarding, users therefore choose between text, voice and touch, and the input area adapts to the choice.',
    'cs.milo.in1':'Milo suggests suitable messages as large tap areas. A whole conversation can be held without typing.',
    'cs.milo.in2h':'Voice','cs.milo.in2':'For Karl, who has visual and motor impairments, a large speak button dominates.',
    'cs.milo.in3h':'Recording','cs.milo.in3':'While speaking, a clear notice shows that Milo is listening. The recognised text can be checked before sending.',
    'cs.milo.s7.p2':'Messages are only sent after a deliberate tap on send. Voice output puts speech in context (“Milo says …”), and a call mode was deliberately dropped because it would have been hard for this audience to follow.',
    'cs.milo.s8.title':'Design system',
    'cs.milo.s8.type':'Font sizes selectable in onboarding',
    'cs.milo.s8.small':'Small · 16 px','cs.milo.s8.normal':'Normal · 20 px','cs.milo.s8.large':'Large · 24 px',
    'cs.milo.s8.sample1':'What will the weather be tomorrow?','cs.milo.s8.sample2':'What will the weather be tomorrow?','cs.milo.s8.sample3':'What will the weather be tomorrow?',
    'cs.milo.s8.shape':'Shape follows function','cs.milo.s8.r1':'Content','cs.milo.s8.r2':'Button','cs.milo.s8.r3':'Input',
    'cs.milo.s8.colors':'Colours','cs.milo.s8.c1':'Action','cs.milo.s8.c2':'Surface','cs.milo.s8.c3':'Own input',
    'cs.milo.s8.b1':'Warm tones from yellow to dark red on a light background are easy to perceive and feel calm. Custom colour themes were deliberately left out to avoid accidentally illegible settings.',
    'cs.milo.s8.b2':'The user’s own messages and suggestions are light blue, so their actions stand out clearly from Milo’s answers.',
    'cs.milo.s8.b3':'Buttons and input fields carry a subtle shadow, against current trends, so that interactive elements are recognisable as such.',
    'cs.milo.s8.b4':'Decisions use buttons, persistent states use switches and gradations use scales with exactly three steps.',
    'cs.milo.s9.title':'Safety in everyday use',
    'cs.milo.s9.c1':'Reminders','cs.milo.s9.c2':'Help',
    'cs.milo.s9.p1':'Before deleting or cancelling, Milo asks for confirmation, and after every action a short notice confirms success. A wrong tap never has serious consequences.',
    'cs.milo.s9.p2':'Reminders, for example for medication, are created in conversation or by hand and appear as a list or in a familiar calendar. The help area puts phone, chat and email contact with real people first.',
    'cs.milo.s10.title':'Evaluation',
    'cs.milo.s10.p1':'Five people aged 59 to 74 tested the prototype on site on a smartphone, largely without moderation. Ten tasks and questions covered the core areas.',
    'cs.milo.task1':'Start a conversation with Milo','cs.milo.task2':'Resume a past conversation','cs.milo.task3':'Create a reminder','cs.milo.task4':'Change the input method',
    'cs.milo.avg1':'9.8','cs.milo.avg2':'9.0','cs.milo.avg3':'9.4','cs.milo.avg4':'7.8',
    'cs.milo.strip.caption':'Feasibility per task from 0 to 10 · each dot is one person, not solved counts as 0',
    'cs.milo.q1':'“It was very calm and relaxed.”','cs.milo.q1c':'Participant, 59',
    'cs.milo.q2':'“Understandable, not technical.”','cs.milo.q2c':'Participant, 72',
    'cs.milo.s10.h':'Findings',
    'cs.milo.s10.b1':'Clarity, menu navigation and the calm introduction were praised throughout. Everyone gave the welcome sequence their full attention.',
    'cs.milo.s10.b2':'Uncertainty arose mainly at the limits of the Figma prototype, for example because no real keyboard appeared.',
    'cs.milo.s10.b3':'The term “input method” was not immediately clear, and one person could not find the setting.',
    'cs.milo.s10.b4':'Several found the large type too large. This confirms that font size has to be selectable rather than set to maximum across the board.',
    'cs.milo.s10.p2':'Afterwards, faulty interactions and overlays were fixed and the background was adjusted for better contrast. Since participants had not found the app themselves, the effect of the introduction on the decision to use it cannot be proven.',
    'cs.milo.s11.title':'Conclusion',
    'cs.milo.s11.pull':'Here, accessibility was not one requirement among many but the basis of every decision. The design had to be derived from people’s situation, not from familiar patterns or personal style.',
    'cs.syntegon.kicker':'Industrial UX · Bachelor thesis · 2026',
    'cs.syntegon.sub':'Visualisation system for pharmaceutical production',
    'cs.syntegon.pitch':'In my bachelor thesis, in cooperation with <strong>Syntegon</strong>, I designed a visualisation system and built it as an interactive prototype. It guides operators in pharmaceutical production step by step through manual tasks and ensures that errors have no consequences.',
    'cs.syntegon.role':'Research · Concept · UX/UI · Prototype',
    'cs.syntegon.methods':'Literature and document analysis · Expert interviews · Qualitative content analysis · Expert evaluation',
    'cs.syntegon.meta.period':'Period','cs.syntegon.period':'March to July 2026',
    'cs.syntegon.s1.title':'Research question',
    'cs.syntegon.s1.pull':'How must a visualisation system be designed so that it guides operators safely through manual tasks and prevents errors?',
    'cs.syntegon.s1.p1':'Pharmaceutical production is subject to strict regulatory requirements such as the EU GMP guidelines. Wherever people intervene manually, mix-ups can have far-reaching consequences. The thesis examines how information architecture, step guidance and feedback need to work together in this environment.',
    'cs.syntegon.s2.title':'Approach',
    'cs.syntegon.p1.h':'Literature and documents','cs.syntegon.p1.t':'Regulatory framework, human causes of error and core principles of industrial user interfaces',
    'cs.syntegon.p2.h':'Expert interviews','cs.syntegon.p2.t':'Three guided interviews with specialists in development, technical implementation and pharmaceutical regulation',
    'cs.syntegon.p3.h':'Requirements','cs.syntegon.p3.t':'Derived through qualitative content analysis, separated into system requirements and operator guidance',
    'cs.syntegon.p4.h':'Prototype','cs.syntegon.p4.t':'Interactive hi-fi prototype in Figma, built with the company’s design system',
    'cs.syntegon.p5.h':'Expert evaluation','cs.syntegon.p5.t':'Individual questions per expert on a five-point scale, plus overarching usability criteria',
    'cs.syntegon.p6.h':'Iteration','cs.syntegon.p6.t':'Unified terminology, added a verification step and refined the step guidance',
    'cs.syntegon.s3.title':'Guiding principle: fail-safe',
    'cs.syntegon.s3.p1':'Openness and free-form interaction take a back seat in this environment. The system takes on the responsibility that, in safety-critical processes, cannot rest with people alone.',
    'cs.syntegon.f1':'Step is shown','cs.syntegon.f2':'Operator acts','cs.syntegon.f3':'System verifies',
    'cs.syntegon.f4':'Correct: brief confirmation, then the next step follows without further input',
    'cs.syntegon.f5':'Deviation: the process only continues once the step is carried out correctly',
    'cs.syntegon.f.caption':'Principle of step guidance, simplified',
    'cs.syntegon.g1.h':'Step-bound guidance','cs.syntegon.g1.t':'Operators always see exactly the current step and the information they need for it.',
    'cs.syntegon.g2.h':'Verification instead of confirmation','cs.syntegon.g2.t':'A step only counts as done once the system has verified it. Where verification is possible, manual approvals are removed.',
    'cs.syntegon.g3.h':'Less interaction','cs.syntegon.g3.t':'Every input on screen is a secondary task. Fewer confirmations keep hands and attention on the actual work.',
    'cs.syntegon.g4.h':'Familiar interface','cs.syntegon.g4.t':'The company’s design system ensures a consistent look and eases orientation.',
    'cs.syntegon.s4.title':'Evaluation and iteration',
    'cs.syntegon.s4.p1':'Since real operators were not available during the project, the three interviewed experts evaluated the prototype. They combine domain knowledge with knowledge of the requirements, which makes them particularly effective evaluators. At the same time, the derived requirements were fed back to the same people.',
    'cs.syntegon.s4.p2':'Feedback and system response as well as the fail-safe effect were rated particularly positively. The evaluation also revealed a step that could only be confirmed manually. It was rebuilt so that only a system check completes it, and the confirmation buttons were removed.',
    'cs.syntegon.s4.p3':'An expert evaluation does not replace testing with end users. The concept is a validated foundation on which further development can build.',
    'cs.syntegon.s5.title':'Personal learning',
    'cs.syntegon.s5.p1':'Working on an industrial product with people from mechanical engineering, pharma engineering, UX and research and development was especially valuable. In this environment, reliable guidance matters more than freedom of interaction. Good design here means shifting responsibility from people to the system.',
    'cs.syntegon.note':'The thesis contains confidential company information. Screens and project-specific details are therefore not shown.',
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
  // Lo-fi/hi-fi switch: one grid, both image sets stacked, the segmented control picks which one shows.
  mContent.addEventListener('click', e => {
    const button = e.target.closest('.cs__seg button[data-fi]');
    if (!button) return;
    const grid = button.closest('.cs__sec').querySelector('.cs__fiGrid');
    if (!grid) return;
    grid.dataset.fiState = button.dataset.fi;
    $$('button[data-fi]', button.parentElement).forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  });
  addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeProject(); });
  mContent && mContent.addEventListener('scroll', () => {
    const max = mContent.scrollHeight - mContent.clientHeight;
    mProgress.style.width = (max > 0 ? (mContent.scrollTop / max) * 100 : 0) + '%';
  }, { passive: true });

  /* ---------- Year safety + console sign ---------- */
  console.log('%cHenri Löhlein — UX/UI Design', 'font-size:14px;font-weight:600;color:#ff6b5e');
})();
