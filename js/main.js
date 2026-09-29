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
    'tag.work':'Projects &amp; case studies','tag.tools':'Tools I use','tag.how':'Approach','tag.focus':'Focus','tag.contact':'Contact',
    'how.title':'I create digital products that get people to their goal <em>intuitively</em> and <em>effectively</em>.',
    'how.lede':'Solution-oriented thinking guides every phase, from the first conversation to the last test. Always with an eye on different perspectives, the product and above all: the people using it.',
    'how.s1.l':'Understand','how.s1.m':'Interviews, surveys, market analysis, personas, user journeys, cognitive walkthroughs&nbsp;…',
    'how.s2.l':'Structure','how.s2.m':'Information architecture, card sorting, user flows, use cases&nbsp;…',
    'how.s3.l':'Design','how.s3.m':'Low&#8209;fi wireframes &amp; mockups, prototyping, design systems, AI&#8209;assisted methods &amp; rapid prototyping&nbsp;…',
    'how.s4.l':'Test','how.s4.m':'Usability tests, A/B tests, surveys, user interviews, expert reviews &amp;&nbsp;interviews&nbsp;…',
    'focus.title':'Why do people <em>struggle</em> with some products while others <span class="nw"><em>delight</em> them?</span>',
    'focus.lede':'This question drives me. To me, a problem is an opportunity, and my aim is to use every chance for intuitive and innovative approaches on the way to a solution.',
    'focus.psy.t':'Psychology in design','focus.psy.p':'Whether a product delights or repels is often decided unconsciously. Mechanics like nudging, persuasive design or dark patterns shape our digital everyday life more than we realise, and that is exactly what fascinates me.',
    'focus.tech.t':'Innovative technologies','focus.tech.p':'Artificial intelligence and automation, adaptive systems, robotics: technology is evolving faster than people can understand it. That makes it all the more important to always keep the people using it at the centre.',
    'contact.title':'The best solutions are found <em>together</em>.',
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
    'cs.glance.start':'Starting point','cs.glance.approach':'Approach','cs.glance.result':'Outcome',
    'cs.steady.g1':'Planning apps organise tasks but hardly change behaviour. A system that is too strict creates pressure instead, and anyone who feels controlled deletes the app.',
    'cs.steady.g2':'Four psychological models from the literature, a competitor analysis, three personas with journey maps and use cases, a card sort with four people, then a hi-fi prototype in Figma with an AI assistant as the central control layer.',
    'cs.steady.g3':'Eight people tested the prototype with ten tasks and questions. Layout and look came across as clear and motivating. Adding a routine task caused trouble; the add overlay was stabilised afterwards.',
    'cs.milo.g1':'For many older people the biggest hurdle is not operating the device but the fear of doing something wrong. The market analysis found no AI assistant aimed specifically at this group.',
    'cs.milo.g2':'Literature research and market analysis, turned into guidelines for eyesight, motor skills, attention and trust. Three personas with journey maps and use cases, then a Figma prototype with three selectable input modes.',
    'cs.milo.g3':'Five people aged 59 to 74 tested the prototype. Clarity, menu navigation and the calm onboarding were praised throughout. The term “input method” was not immediately understood.',
    'cs.cognify.g1':'Learning platforms mostly target school, university or work, AR apps mostly children. There was no suitable offer for adults who want to learn out of curiosity. 70 % of respondents named motivation as the biggest obstacle.',
    'cs.cognify.g2':'Competitor analysis, a survey with 20 participants, personas and journey maps. Then lo-fi and hi-fi prototypes in Figma and a dedicated AR app built with Unity and the Vuforia Engine.',
    'cs.cognify.g3':'Six moderated tests with ten tasks. Everyone completed courses and quizzes with ease, learning effect 9.5 out of 10. Five of six initially missed the AR feature because its cue was buried in the body text.',
    'cs.syntegon.g1':'Pharmaceutical production is subject to strict regulatory requirements. Wherever people intervene manually, mix-ups can have far-reaching consequences.',
    'cs.syntegon.g2':'Literature and document analysis, three expert interviews and a qualitative content analysis. This led to an interactive hi-fi prototype in Figma built with the company’s design system.',
    'cs.syntegon.g3':'The experts rated feedback, system response and the fail-safe effect particularly highly. A step that could only be confirmed manually is now completed solely by a system check.',
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
    'cs.milo.quote1':'“It was very calm and relaxed.”','cs.milo.q1c':'Participant, 59',
    'cs.milo.quote2':'“Understandable, not technical.”','cs.milo.q2c':'Participant, 72',
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
      { text: 'User Experience Design · Product Design · Interfacedesign · Usability Design · User Research · Interaktionsdesign', hold: 4200 },
      { text: 'Hochschule Ansbach · Syntegon · forwerts', hold: 3000 }
    ],
    en: [
      { text: 'User Experience Design · Product Design · Interface Design · Usability Design · User Research · Interaction Design', hold: 4200 },
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
    startStripType();
  }

  /* ---------- Custom cursor: dot follower ----------
     A small dot that trails the pointer with a short exponential ease, stretches slightly along
     fast movement and grows a little, with a soft halo, over anything clickable.
     Size states live in CSS (.is-hover/.is-down/.is-hidden). */
  const cursor = $('#cursor');
  const cDot = $('#cursorDot');
  if (cursor && cDot && !reduce && matchMedia('(any-hover:hover) and (any-pointer:fine)').matches) {
    let tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty, started = false;
    let stretch = 0, angle = 0;

    addEventListener('pointermove', e => {
      if (e.pointerType === 'touch') return;
      tx = e.clientX; ty = e.clientY;
      if (!started) { x = tx; y = ty; started = true; }
      cursor.classList.add('is-visible');
      cursor.classList.remove('is-hidden');
    }, { passive: true });
    document.addEventListener('mouseleave', () => cursor.classList.add('is-hidden'));
    document.addEventListener('mouseenter', () => cursor.classList.remove('is-hidden'));
    addEventListener('pointerdown', e => { if (e.pointerType !== 'touch') cursor.classList.add('is-down'); });
    addEventListener('pointerup', () => cursor.classList.remove('is-down'));
    addEventListener('blur', () => cursor.classList.remove('is-down'));

    let last = performance.now();
    (function loop(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const k = 1 - Math.exp(-dt * 24);           // frame-rate independent ease, ~40ms lag
      const dx = tx - x, dy = ty - y;
      x += dx * k; y += dy * k;
      // stretch only the resting dot; a grown circle wobbling would look loose
      const speed = Math.hypot(dx, dy);
      const plain = !cursor.classList.contains('is-hover');
      stretch += ((plain ? Math.min(speed / 90, 0.35) : 0) - stretch) * 0.25;
      if (speed > 0.5) angle = Math.atan2(dy, dx) * 180 / Math.PI;
      cursor.style.transform = `translate3d(${x}px,${y}px,0)`;
      cDot.style.transform = `rotate(${angle}deg) scale(${1 + stretch},${1 - stretch * 0.5})`;
      requestAnimationFrame(loop);
    })(last);

    document.documentElement.classList.add('has-custom-cursor');
    const hoverSel = 'a,button,[data-cursor],.project,label,summary,[role="button"]';
    document.addEventListener('mouseover', e => cursor.classList.toggle('is-hover', !!e.target.closest(hoverSel)));
  }

  /* ---------- Nav scroll state ---------- */
  const nav = $('#nav');
  addEventListener('scroll', () => { nav.classList.toggle('is-stuck', scrollY > 30); }, { passive: true });

  /* ---------- Word-Blur-In (gezielt: Überschriften/kurze Zeilen, siehe [data-split] im HTML) ----------
     Läuft rekursiv durch Text-Knoten, lässt verschachtelte <em>/<b> (Gradient-Wörter) unangetastet
     stehen und umhüllt jedes Wort mit einem .bw-Span; --i treibt die gestaffelte Verzögerung in
     css/styles.css. Mit data-stagger versetzt ein Basis-Index mehrere Zeilen eines Blocks zueinander. */
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

  /* ---------- Scroll-linked signature gradient (ember -> slate across the whole page) ----------
     One warm->cool arc for the entire scroll, not a different hue per section: --warm-1 and --cool-1
     (plus --bg-tint, which drives every --head-grad headline and the background tone) all interpolate
     together from the ember palette at the top to the slate palette further down. The transition
     is a long, slow drift from the tools band to the contact section: it begins in the project list
     and completes as the contact section comes into view. */
  (function initScrollGradient() {
    const root = document.documentElement;
    const EMBER = { '--warm-1': [169, 80, 63], '--cool-1': [91, 87, 84] };
    const SLATE = { '--warm-1': [63, 90, 134], '--cool-1': [92, 95, 102] };
    const tools = document.getElementById('tools'), contact = document.getElementById('contact');
    const smooth = t => t * t * (3 - 2 * t);
    const lerp = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
    const toHex = c => '#' + c.map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('');
    let ticking = false;
    function apply() {
      let p;
      if (tools && contact) {
        const docTop = el => el.getBoundingClientRect().top + scrollY;
        const start = docTop(tools) - innerHeight * 1.8, end = docTop(contact) - innerHeight * 0.3;
        p = (scrollY - start) / Math.max(1, end - start);
      } else {
        p = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
      }
      const f = smooth(Math.min(1, Math.max(0, p)));
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

  /* ---------- Vorgehen: Linienzug aus den echten Positionen der Stationen ----------
     Nebeneinander: Schleife zwischen je zwei Phasen, Rückweg als U unter den Stationen.
     Untereinander (Tablet, Mobil): Schleife seitlich, Rückweg links neben den Stationen.
     Die Stationen spart eine Maske aus, so bleiben die Symbole frei. */
  const NS = 'http://www.w3.org/2000/svg';
  function drawCycle(box) {
    const svg = box.querySelector('.cy-line');
    const R = box.getBoundingClientRect();
    const nodes = [...box.querySelectorAll('.cy-node')];
    if (!svg || !R.width || nodes.length < 2) return;
    const c = nodes.map(n => { const b = n.getBoundingClientRect(); return { x: b.left - R.left + b.width / 2, y: b.top - R.top + b.height / 2 }; });
    const g = nodes[0].getBoundingClientRect().width / 2, n = c.length - 1, rr = 22;
    const row = c.every(p => Math.abs(p.y - c[0].y) < 2), col = c.every(p => Math.abs(p.x - c[0].x) < 2);
    svg.style.display = row || col ? '' : 'none';
    if (!row && !col) return;
    let d, holes;
    if (row) {
      const y = c[0].y, lp = 22, yb = y + g + 26;
      d = `M${c[0].x + g} ${y}`;
      for (let i = 0; i < n; i++) {
        const a = c[i].x + g, b = c[i + 1].x - g, m = (a + b) / 2;
        d += ` L${m - 18} ${y} C${m + 13} ${y} ${m + 13} ${y - lp} ${m} ${y - lp} C${m - 13} ${y - lp} ${m - 13} ${y} ${m + 18} ${y} L${b} ${y}`;
        if (i < n - 1) d += ` L${c[i + 1].x + g} ${y}`;
      }
      d += ` L${c[n].x} ${y} L${c[n].x} ${yb - rr} A${rr} ${rr} 0 0 1 ${c[n].x - rr} ${yb} L${c[0].x + rr} ${yb} A${rr} ${rr} 0 0 1 ${c[0].x} ${yb - rr} L${c[0].x} ${y} L${c[0].x + g} ${y}`;
      holes = c.map(p => [p.x - g + 1, p.y - g + 6, 2 * g - 2, 2 * g - 4]);
    } else {
      const x = c[0].x, lp = 20, xb = x - g - 24;
      d = `M${x} ${c[0].y + g}`;
      for (let i = 0; i < n; i++) {
        const a = c[i].y + g, b = c[i + 1].y - g, m = (a + b) / 2;
        d += ` L${x} ${m - 18} C${x} ${m + 13} ${x + lp} ${m + 13} ${x + lp} ${m} C${x + lp} ${m - 13} ${x} ${m - 13} ${x} ${m + 18} L${x} ${b}`;
        if (i < n - 1) d += ` L${x} ${c[i + 1].y + g}`;
      }
      d += ` L${x} ${c[n].y} L${xb + rr} ${c[n].y} A${rr} ${rr} 0 0 1 ${xb} ${c[n].y - rr} L${xb} ${c[0].y + rr} A${rr} ${rr} 0 0 1 ${xb + rr} ${c[0].y} L${x} ${c[0].y} L${x} ${c[0].y + g}`;
      holes = c.map(p => [p.x - g + 6, p.y - g + 1, 2 * g - 4, 2 * g - 2]);
    }
    svg.setAttribute('viewBox', `0 0 ${R.width} ${R.height}`);
    svg.querySelectorAll('path').forEach(p => p.setAttribute('d', d));
    const mask = svg.querySelector('mask'), P = 200;
    Object.entries({ x: -P, y: -P, width: R.width + 2 * P, height: R.height + 2 * P }).forEach(([k, v]) => mask.setAttribute(k, v));
    const rect = (x, y, w, h, fill) => { const e = document.createElementNS(NS, 'rect'); Object.entries({ x, y, width: w, height: h, fill }).forEach(([k, v]) => e.setAttribute(k, v)); return e; };
    mask.replaceChildren(rect(-P, -P, R.width + 2 * P, R.height + 2 * P, '#fff'), ...holes.map(h => rect(...h, '#000')));
  }
  $$('[data-cycle]').forEach(box => {
    // Die Reveal-Einblendung verschiebt die Box per transform; getBoundingClientRect misst
    // Box und Stationen gleich verschoben, die Differenzen bleiben also korrekt.
    new ResizeObserver(() => drawCycle(box)).observe(box);
    document.fonts && document.fonts.ready.then(() => drawCycle(box));
  });

  /* ---------- Project modal ----------
     Centred window with chapters. Each hidden source article holds .cs__chapter blocks; the
     first is the overview, every chapter becomes a tab with its own scrolling pane, and the
     last pane links on to the next project in the list. */
  const modal = $('#modal');
  const mWin = $('.modal__win', modal);
  const mContent = $('#modalContent');
  const mTabs = $('#modalTabs');
  const mTitle = $('#modalTitle');
  const mKicker = $('#modalKicker');
  const mProgress = $('#modalProgress');
  const cases = $('#cases');
  const order = $$('.project').map(p => p.dataset.project);
  let chapters = [];
  let current = 0;
  let caseId = null;
  let lastFocus = null;
  const tr = (de, en) => (lang === 'en' ? en : de);
  const arrow = d => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d > 0 ? 'M5 12h14M13 6l6 6-6 6' : 'M19 12H5M11 6l-6 6 6 6'}"/></svg>`;
  const projectName = id => {
    const el = $(`.project[data-project="${id}"] .project__name`);
    return el ? el.textContent.replace(/\s+/g, ' ').trim() : id;
  };

  function labelChapters() {
    mTabs.setAttribute('aria-label', tr('Kapitel', 'Chapters'));
    chapters.forEach((c, i) => {
      c.tab.textContent = tr(c.de, c.en);
      const prev = chapters[i - 1];
      const nextId = order[(order.indexOf(caseId) + 1) % order.length];
      c.foot.innerHTML =
        (prev ? `<button type="button" data-chapter="${i - 1}">${arrow(-1)}${tr(prev.de, prev.en)}</button>` : '') +
        (chapters[i + 1]
          ? `<button type="button" class="is-next" data-chapter="${i + 1}">${tr(chapters[i + 1].de, chapters[i + 1].en)}${arrow(1)}</button>`
          : `<button type="button" class="is-next" data-project="${nextId}">${tr('Nächstes Projekt', 'Next project')}: ${projectName(nextId)}${arrow(1)}</button>`);
    });
    const kicker = chapters[0] && $('.cs__kicker', chapters[0].pane);
    mKicker.textContent = kicker ? kicker.textContent : '';
  }

  function showChapter(i, focusTab) {
    current = i;
    mWin.dataset.chapter = i;
    chapters.forEach((c, k) => {
      const on = k === i;
      c.tab.setAttribute('aria-selected', String(on));
      c.tab.tabIndex = on ? 0 : -1;
      c.pane.hidden = !on;
      if (on) c.pane.scrollTop = 0;
    });
    mProgress.style.width = ((i + 1) / chapters.length) * 100 + '%';
    const tab = chapters[i].tab;
    if (mTabs.scrollWidth > mTabs.clientWidth) tab.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' });
    if (focusTab) tab.focus({ preventScroll: true });
  }

  function openProject(id) {
    const src = cases.querySelector(`[data-case="${id}"]`);
    if (!src) return;
    const copy = src.cloneNode(true);
    // Clones must remember the German source text, not whichever language is showing right now.
    const srcI = $$('[data-i18n]', src);
    $$('[data-i18n]', copy).forEach((el, i) => { if (DEstore.has(srcI[i])) DEstore.set(el, DEstore.get(srcI[i])); });
    mContent.innerHTML = '';
    mTabs.innerHTML = '';
    caseId = id;
    mWin.setAttribute('data-case', id); // so [data-case="x"] .cs__title accent rules match
    chapters = $$(':scope > .cs__chapter', copy).map((ch, i) => {
      const pane = document.createElement('div');
      pane.className = 'modal__pane';
      pane.id = `cs-pane-${i}`;
      pane.setAttribute('role', 'tabpanel');
      pane.setAttribute('aria-labelledby', `cs-tab-${i}`);
      pane.tabIndex = 0;
      pane.append(...ch.childNodes);
      const foot = document.createElement('nav');
      foot.className = 'modal__foot';
      pane.append(foot);
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.id = `cs-tab-${i}`;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', pane.id);
      tab.addEventListener('click', () => showChapter(i));
      mTabs.append(tab);
      mContent.append(pane);
      return { pane, tab, foot, de: ch.dataset.label, en: ch.dataset.labelEn || ch.dataset.label };
    });
    const nameEl = chapters[0] && $('.cs__title', chapters[0].pane);
    mTitle.textContent = nameEl ? nameEl.textContent : '';
    labelChapters();
    showChapter(0);
    if (!modal.classList.contains('is-open')) {
      lastFocus = document.activeElement;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    setTimeout(() => mWin.focus({ preventScroll: true }), 60);
  }
  function closeProject() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastFocus && lastFocus.focus && lastFocus.focus();
  }
  $$('.project').forEach(p => {
    p.addEventListener('click', () => openProject(p.dataset.project));
  });
  $$('[data-close]', modal).forEach(b => b.addEventListener('click', closeProject));
  mTabs.addEventListener('keydown', e => {
    const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); showChapter(e.key === 'Home' ? 0 : chapters.length - 1, true); }
    else if (d) { e.preventDefault(); showChapter((current + d + chapters.length) % chapters.length, true); }
  });
  mContent.addEventListener('click', e => {
    // Chapter footer: previous/next chapter or the next project
    const step = e.target.closest('.modal__foot button');
    if (step) {
      if (step.dataset.project) openProject(step.dataset.project);
      else showChapter(Number(step.dataset.chapter), true);
      return;
    }
    // Overview links that jump into a chapter (forwerts client projects)
    const jump = e.target.closest('[data-goto]');
    if (jump) {
      showChapter(Number(jump.dataset.goto), true);
      const target = jump.dataset.gotoSel && $(jump.dataset.gotoSel, chapters[current].pane);
      const block = target && (target.closest('section') || target);
      if (block) {
        const pane = chapters[current].pane;
        pane.scrollTop += block.getBoundingClientRect().top - pane.getBoundingClientRect().top - 24;
      }
      return;
    }
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
  addEventListener('keydown', e => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') { closeProject(); return; }
    // Keep keyboard focus inside the window while it is open
    if (e.key !== 'Tab') return;
    const focusable = $$('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])', mWin)
      .filter(el => el.offsetParent !== null && !el.closest('[hidden]'));
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === mWin)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  document.addEventListener('hl:lang', () => { if (chapters.length) labelChapters(); });

  /* ---------- Einstieg-Animation auf der Linie der Projektliste ----------
     Engine: js/einstieg-szene.js, js/einstieg-zeichnen.js, js/einstieg-animation.js.
     Stil H (Linie leise): Stil A mit halber Deckkraft, damit die Projekte im Vordergrund bleiben.
     Sichtbar ist nur ein weicher Ausschnitt, der mit der Person über die Breite wandert. */
  const intro = $('#intro');
  if (intro && window.EinstiegAnimation) {
    const stage = EinstiegAnimation.mount(intro, { style: 'h', layout: 'window', frame: 'line', ground: false, winW: 520, shine: 9 });
    const labelIntro = () => {
      intro.setAttribute('aria-label', lang === 'en'
        ? 'Animation: talking with users, sorting the insights, designing a screen from them and testing it.'
        : 'Animation: Gespräche mit Nutzenden, Erkenntnisse ordnen, daraus einen Screen gestalten und testen.');
      stage.sync();
    };
    labelIntro();
    document.addEventListener('hl:lang', labelIntro);
  }

  /* ---------- Year safety + console sign ---------- */
  console.log('%cHenri Löhlein — UX/UI Design', 'font-size:14px;font-weight:600;color:#ff6b5e');
})();
