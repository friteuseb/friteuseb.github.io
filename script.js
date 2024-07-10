document.addEventListener('DOMContentLoaded', (event) => {
  // Animation des sections au défilement
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });

  // Animation des barres de compétences
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const width = target.getAttribute('data-width');
        target.style.width = width;
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });

  // Mode jour/nuit (optionnel)
  const toggleTheme = document.getElementById('theme-toggle');
  if (toggleTheme) {
    toggleTheme.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
    });
  }
});