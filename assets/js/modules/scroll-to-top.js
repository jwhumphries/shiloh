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

  // Handle click - use swup's scroll plugin if available
  btn.onclick = () => {
    if (swup) {
      // Try to use swup's scroll plugin for consistent animation
      const scrollPlugin = swup.findPlugin('SwupScrollPlugin');
      if (scrollPlugin && typeof scrollPlugin.scrollTo === 'function') {
        scrollPlugin.scrollTo(0);
        return;
      }
    }
    // Fallback to native smooth scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}
