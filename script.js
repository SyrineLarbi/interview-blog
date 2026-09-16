// Interview Prep — shared behaviour
(function () {
  'use strict';

  var key = 'interview-prep:' + location.pathname.split('/').pop();

  function safeGet() {
    try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) { return {}; }
  }
  function safeSet(obj) {
    try { localStorage.setItem(key, JSON.stringify(obj)); } catch (e) { /* private mode */ }
  }

  // --- restore + persist checkbox progress ---
  var state = safeGet();
  var boxes = document.querySelectorAll('.checklist input[type="checkbox"]');
  boxes.forEach(function (box, i) {
    if (state['cb' + i]) box.checked = true;
    box.addEventListener('change', function () {
      var s = safeGet();
      s['cb' + i] = box.checked;
      safeSet(s);
    });
  });

  // --- expand / collapse all ---
  var tools = document.querySelector('.tools');
  if (tools) {
    var expand = tools.querySelector('[data-action="expand"]');
    var collapse = tools.querySelector('[data-action="collapse"]');
    var print = tools.querySelector('[data-action="print"]');

    if (expand) expand.addEventListener('click', function () {
      document.querySelectorAll('details.q').forEach(function (d) { d.open = true; });
    });
    if (collapse) collapse.addEventListener('click', function () {
      document.querySelectorAll('details.q').forEach(function (d) { d.open = false; });
    });
    if (print) print.addEventListener('click', function () {
      document.querySelectorAll('details.q').forEach(function (d) { d.open = true; });
      window.print();
    });
  }

  // --- open a question if linked directly ---
  if (location.hash) {
    var target = document.querySelector(location.hash);
    if (target && target.tagName === 'DETAILS') target.open = true;
  }
})();
