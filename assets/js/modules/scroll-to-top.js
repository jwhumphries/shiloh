/**
 * Scroll-to-Top Button Module
 * Integrates with swup's scroll plugin for smooth scrolling
 */

let scrollHandler = null;

/**
 * Initialize scroll-to-top button
 * @param {Object} swup - The swup instance
 */
export function initScrollToTop(swup) {
  const btn = document.getElementById('scroll-to-top');
  if (!btn) return;

  // Update visibility based on scroll position
  function updateVisibility() {
    if (window.scrollY > 300) {
      btn.classList.remove('opacity-0', 'pointer-events-none');
      btn.classList.add('opacity-100');
      btn.setAttribute('aria-hidden', 'false');
      btn.removeAttribute('tabindex');
    } else {
      btn.classList.remove('opacity-100');
      btn.classList.add('opacity-0', 'pointer-events-none');
      btn.setAttribute('aria-hidden', 'true');
      btn.setAttribute('tabindex', '-1');
    }
  }

  // Remove existing handler if any
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler);
  }

  // Add scroll listener
  scrollHandler = updateVisibility;
  window.addEventListener('scroll', scrollHandler, { passive: true });

  // Initial check
  updateVisibility();

  // Handle click - use custom smooth scroll animation matching ToC behavior
  btn.onclick = () => {
    const start = window.scrollY;
    const targetY = 0;
    const duration = 400; // milliseconds, matches ToC scroll
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic (matches ToC scroll)
      const eased = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, start + (targetY - start) * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  };
}
