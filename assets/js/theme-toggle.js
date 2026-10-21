// Theme toggle: flip between light and dark and remember the choice.
// Until the visitor picks one, follow system changes live.
// (theme.js applies the initial theme before first paint.)
(function () {
  var root = document.documentElement;
  var toggle = document.querySelector('.theme-toggle');
  var system = window.matchMedia('(prefers-color-scheme: dark)');

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    if (toggle) {
      toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      toggle.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    }
  }

  function saved() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  apply(root.getAttribute('data-theme') || 'light');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  var onSystemChange = function (e) { if (!saved()) apply(e.matches ? 'dark' : 'light'); };
  if (system.addEventListener) system.addEventListener('change', onSystemChange);
  else if (system.addListener) system.addListener(onSystemChange);
})();
