/* Preview-only behaviour for preview-neu.html */
(function () {
  'use strict';

  // Werkzeugband: die Liste einmal duplizieren, damit die Endlos-Bewegung nahtlos wiederholt.
  const track = document.querySelector('.toolband__track');
  if (track) {
    [...track.children].forEach(li => {
      const c = li.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      track.appendChild(c);
    });
  }

  // Beleg-Links öffnen dasselbe Case-Study-Panel wie die Projektzeilen (löst deren Klick aus).
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-case]');
    if (!b || b.closest('#cases')) return;
    const row = document.querySelector('.project[data-project="' + b.dataset.case + '"]');
    if (row) row.click();
  });

  // EN für die in der Preview neu formulierten Texte. main.js (live) bleibt unverändert, darum
  // eigene Schlüssel über data-i18n-p, angewendet auf dasselbe hl:lang-Event.
  const EN = {
    'intro.title':'UX/UI & Product Designer focused on research and <em>behavioural psychology.</em>',
    'intro.lede':'I design digital products from the first interview to the tested prototype. Most recently industrial UX at Syntegon, before that e-commerce at forwerts interactive.',
    'p.syntegon.role':'Industrial UX, Research & Development · 2026',
    'p.syntegon.tease':'A mobile visualisation system that presents process states to machine operators in pharmaceutical production in an actionable way. System logic, information architecture and prototype, based on research and expert interviews, in collaboration with UX, mechanical and pharma engineering.',
    'p.steady.role':'Behavioral Design, concept project · 2025',
    'p.forwerts.role':'UX Design, E-Commerce · 2024/25',
    'p.milo.role':'Inclusive Design, concept project · 2025',
    'p.cognify.role':'AR e-learning, concept project',
    'tools.title':'Tools I work with',
    'tl.1.t':'Syntegon, Research & Development','tl.1.d':'Industrial UX. Mobile visualisation system for machine operators in pharmaceutical production',
    'tl.2.t':'UX Design, forwerts interactive','tl.2.d':'Heilbronn. E-commerce, funnel flows, design structures, UX workshops',
    'tl.3.w':'until 09/2026','tl.3.t':'Bachelor in Visualisation and Interaction in Digital Media','tl.3.d':'Ansbach University of Applied Sciences, graduated with 1.3',
    'f.lang':'Languages','f.lang.v':'German (native), English',
    'f.loc':'Based in','f.loc.v':'Rothenburg ob der Tauber, Germany',
    'f.mode':'Work setup','f.mode.v':'On-site, hybrid or remote, willing to relocate',
    'f.int':'Interests','f.int.v':'AI in products and in the design process, psychology in design, new forms of interaction such as AR and voice',
    'contact.sub':'For a role as Junior UX/UI or Product Designer, on-site, hybrid or remote.'
  };
  const els = [...document.querySelectorAll('[data-i18n-p]')];
  const DE = new Map(els.map(el => [el, el.innerHTML]));
  const apply = lang => els.forEach(el => {
    const k = el.getAttribute('data-i18n-p');
    el.innerHTML = lang === 'en' && EN[k] ? EN[k] : DE.get(el);
  });
  document.addEventListener('hl:lang', e => apply(e.detail));
  if (document.documentElement.lang === 'en') apply('en');
})();
