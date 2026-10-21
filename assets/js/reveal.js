// Reveal sections as they scroll into view. Sections already on screen
// at load stay visible so nothing flickers.
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px' });

  document.querySelectorAll('.content .section').forEach(function (section) {
    if (section.getBoundingClientRect().top < window.innerHeight) return;
    section.classList.add('reveal');
    observer.observe(section);
  });
})();
