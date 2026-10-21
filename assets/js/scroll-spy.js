// Scroll-spy: highlight the sidebar link for the section currently in view,
// and slide a single indicator between links so the change is smooth.
(function () {
  var nav = document.querySelector('.section-nav');
  if (!nav) return;

  var indicator = nav.querySelector('.section-nav-indicator');
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[data-section]'));
  var sections = links
    .map(function (link) { return document.getElementById(link.dataset.section); })
    .filter(Boolean);
  if (!sections.length) return;

  var current = null;

  function moveIndicator(link) {
    if (!indicator || !link) return;
    indicator.style.width = link.offsetWidth + 'px';
    indicator.style.height = link.offsetHeight + 'px';
    indicator.style.transform = 'translate(' + link.offsetLeft + 'px,' + link.offsetTop + 'px)';
    indicator.classList.add('is-visible');
    keepInView(link);
  }

  // On small screens the nav scrolls sideways; keep the active link centred.
  function keepInView(link) {
    if (nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({
      left: link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2,
      behavior: nav.classList.contains('is-ready') ? 'smooth' : 'auto'
    });
  }

  function setActive(id) {
    if (id === current) return;
    current = id;
    links.forEach(function (link) {
      var active = link.dataset.section === id;
      link.classList.toggle('active', active);
      if (active) {
        link.setAttribute('aria-current', 'true');
        moveIndicator(link);
      } else {
        link.removeAttribute('aria-current');
      }
    });
    if (history.replaceState) {
      history.replaceState(null, '', id === sections[0].id ? location.pathname : '#' + id);
    }
  }

  // The active section is the last one whose top has passed a line
  // 30% down the viewport. At the very bottom, the last section wins
  // (short final sections may never reach that line).
  function update() {
    var line = window.innerHeight * 0.3;
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    var active = sections[0];
    if (atBottom) {
      active = sections[sections.length - 1];
    } else {
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top <= line) active = sections[i];
      }
    }
    setActive(active.id);
  }

  // After a nav click, hold the clicked section active until the smooth
  // scroll settles; otherwise sections near the bottom (which can't scroll
  // to the top) would hand the highlight to the last section.
  var locked = false;
  var unlockTimer = null;
  function scheduleUnlock() {
    clearTimeout(unlockTimer);
    unlockTimer = setTimeout(function () { locked = false; }, 150);
  }
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      setActive(link.dataset.section);
      locked = true;
      scheduleUnlock();
    });
  });

  var ticking = false;
  function onScroll() {
    if (locked) { scheduleUnlock(); return; }
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { ticking = false; update(); });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    var link = nav.querySelector('a.active');
    if (link) moveIndicator(link);
    onScroll();
  });

  // Position without animating on first paint, then enable transitions.
  update();
  requestAnimationFrame(function () { nav.classList.add('is-ready'); });
})();
