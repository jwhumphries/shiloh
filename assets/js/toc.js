(function() {
  const toc = document.getElementById('toc-nav');
  if (!toc) return;

  const tocLinks = toc.querySelectorAll('a[href^="#"]');
  if (tocLinks.length === 0) return;

  const headingIds = Array.from(tocLinks).map(link => {
    const href = link.getAttribute('href');
    return href ? href.slice(1) : null;
  }).filter(Boolean);

  const headings = headingIds.map(id => document.getElementById(id)).filter(Boolean);
  if (headings.length === 0) return;

  const observerOptions = {
    rootMargin: '-80px 0px -80% 0px',
    threshold: 0
  };

  let activeHeading = null;

  function setActiveLink(id) {
    if (activeHeading === id) return;
    activeHeading = id;

    tocLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${id}`) {
        link.parentElement.classList.add('toc-active');
      } else {
        link.parentElement.classList.remove('toc-active');
      }
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, observerOptions);

  headings.forEach(heading => observer.observe(heading));

  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const targetId = href.slice(1);
      const target = document.getElementById(targetId);

      if (target) {
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        setActiveLink(targetId);
      }
    });
  });
})();
