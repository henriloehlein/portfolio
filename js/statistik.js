/* Visitor statistics via GoatCounter (https://www.goatcounter.com).
   A trimmed stand-in for GoatCounter's count.js: sends only path, title, referrer and query
   string (?ref=… shows up as the source). No cookies, no local storage, no screen size, so
   nothing is stored on or read from the visitor's device. Local previews are not counted. */
(function () {
  'use strict';
  var ENDPOINT = 'https://hxnri00.goatcounter.com/count';
  var host = location.hostname;
  if (location.protocol === 'file:' || host === 'localhost' || /^(127\.|10\.|192\.168\.|\[)/.test(host)) return;
  if ('visibilityState' in document && document.visibilityState === 'prerender') return;

  function send(vars) {
    vars.rnd = Math.random().toString(36).slice(2, 7); // defeats caching of the request
    var url = ENDPOINT + '?' + new URLSearchParams(vars);
    if (!(navigator.sendBeacon && navigator.sendBeacon(url))) new Image().src = url;
  }

  send({ p: location.pathname, t: document.title, r: document.referrer, q: location.search });

  // Opened case studies are counted as events, e.g. "case-study/steady"
  window.hlCount = function (name, title) { send({ p: name, t: title || name, e: 'true' }); };
})();
