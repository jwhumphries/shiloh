/**
 * Custom Scrollspy Module
 * Uses getBoundingClientRect with reverse iteration for efficient TOC highlighting
 * Inspired by swup-docs implementation
 */

let sections = [];
let tocNav = null;
let horizon = 150;
let scrollHandler = null;
let resizeHandler = null;

/**
 * Throttle function to limit execution frequency
 */
function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = performance.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

/**
 * Calculate the horizon point based on viewport
 * The horizon is the line where headings become "active"
 * Keep it very small so only the topmost heading is active
 */
function updateHorizon() {
  // Small horizon just below the scroll offset (16px) + small buffer
  // This ensures only the heading at the very top is considered active
  horizon = 40;
}

/**
 * Get the currently active section using reverse iteration
 * This is more efficient as the active section is typically near the scroll position
 */
function getCurrentSection() {
  if (!sections.length) return null;

  const firstSection = sections[sections.length - 1]; // First in document order
  const lastSection = sections[0]; // Last in document order

  // If at the bottom of the document, return the last section
  const scrolledToBottom = window.scrollY >= document.documentElement.scrollHeight - window.innerHeight - 5;
  if (scrolledToBottom) {
    return lastSection;
  }

  // Find the first section (from bottom) that is above the horizon
  const current = sections.find((section) => {
    const rect = section.getBoundingClientRect();
    // Skip invisible sections
    if (!rect.height) return false;
    return rect.top < horizon;
  });

  return current || firstSection;
}

/**
 * Update the active link in the TOC
 */
function markCurrentSection() {
  const currentSection = getCurrentSection();
  if (!currentSection || !tocNav) return;

  // Remove active class from all links
  const activeLink = tocNav.querySelector('a.active');
  if (activeLink) {
    activeLink.classList.remove('active');
  }

  // Add active class to current section's link
  const newActiveLink = tocNav.querySelector(`a[href="#${currentSection.id}"]`);
  if (newActiveLink) {
    newActiveLink.classList.add('active');
  }
}

/**
 * Handle smooth scrolling for TOC links
 * Scrolls from current position to target (up or down)
 */
function handleTocClick(e) {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const targetId = link.getAttribute('href').slice(1);
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  e.preventDefault();

  const targetRect = targetElement.getBoundingClientRect();
  const targetY = window.scrollY + targetRect.top - 16; // 16px offset for breathing room
  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = Math.min(Math.max(Math.abs(distance) * 0.5, 200), 600); // Dynamic duration based on distance
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      // Update URL hash without triggering scroll
      history.pushState(null, '', `#${targetId}`);
    }
  }

  requestAnimationFrame(step);
}

/**
 * Initialize scrollspy for table of contents
 */
export function initScrollspy() {
  // Clean up any existing handlers first
  destroyScrollspy();

  tocNav = document.getElementById('toc-nav');
  const articleContent = document.getElementById('article-content');

  if (!tocNav || !articleContent) {
    return;
  }

  // Get all TOC links
  const tocLinks = tocNav.querySelectorAll('a[href^="#"]');
  if (!tocLinks.length) {
    return;
  }

  // Get all headings in the article and store in reverse order for efficient lookup
  const headingElements = articleContent.querySelectorAll('h2[id], h3[id]');
  sections = [...headingElements].reverse();

  if (!sections.length) {
    return;
  }

  // Calculate initial horizon
  updateHorizon();

  // Mark initial active section
  markCurrentSection();

  // Create throttled scroll handler (10ms throttle like swup-docs)
  scrollHandler = throttle(markCurrentSection, 10);
  window.addEventListener('scroll', scrollHandler, { passive: true });

  // Update horizon on resize
  resizeHandler = throttle(updateHorizon, 100);
  window.addEventListener('resize', resizeHandler, { passive: true });

  // Add click handler for smooth scrolling
  tocNav.addEventListener('click', handleTocClick);
}

/**
 * Cleanup scrollspy
 */
export function destroyScrollspy() {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler);
    scrollHandler = null;
  }
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
    resizeHandler = null;
  }
  if (tocNav) {
    tocNav.removeEventListener('click', handleTocClick);
    tocNav = null;
  }
  sections = [];
  horizon = 150;
}
