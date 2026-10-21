// Links menu: open/close the CV and social links dropdown on small screens.
// Closes on outside click, on Escape, and after a link is chosen.
(function () {
  var menu = document.querySelector('.links-menu');
  var button = menu && menu.querySelector('.links-menu-toggle');
  if (!button) return;

  function isOpen() { return menu.classList.contains('is-open'); }

  function setOpen(open) {
    menu.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  button.addEventListener('click', function () { setOpen(!isOpen()); });

  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('click', function (e) {
    if (isOpen() && !menu.contains(e.target)) setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) {
      setOpen(false);
      button.focus();
    }
  });
})();
