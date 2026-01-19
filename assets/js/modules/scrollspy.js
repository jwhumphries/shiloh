/**
 * Custom Scrollspy Module
 * Uses Intersection Observer for TOC highlighting
 * Replaces FlyonUI scrollspy dependency
 */

let observer = null;
let headings = [];

/**
 * Initialize scrollspy for table of contents
 */
export function initScrollspy() {
  const tocNav = document.getElementById('toc-nav');
  const articleContent = document.getElementById('article-content');

  if (!tocNav || !articleContent) {
    return;
  }

  // Get all TOC links
  const tocLinks = tocNav.querySelectorAll('.toc-link');
  if (!tocLinks.length) {
    return;
  }

  // Get all headings in the article
  headings = Array.from(articleContent.querySelectorAll('h2[id], h3[id]'));
  if (!headings.length) {
    return;
  }

  // Create intersection observer
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          updateActiveLink(tocLinks, id);
        }
      });
    },
    {
      // Offset to account for fixed header and trigger slightly before heading reaches top
      rootMargin: '-80px 0px -70% 0px',
      threshold: 0
    }
  );

  // Observe all headings
  headings.forEach((heading) => observer.observe(heading));

  // Handle scroll to bottom of page (activate last heading)
  window.addEventListener('scroll', handleScrollEnd, { passive: true });
}

/**
 * Update the active link in the TOC
 */
function updateActiveLink(tocLinks, activeId) {
  tocLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === `#${activeId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Handle scroll to end of document
 * Activates the last heading when user scrolls to bottom
 */
function handleScrollEnd() {
  const tocNav = document.getElementById('toc-nav');
  if (!tocNav || !headings.length) return;

  const tocLinks = tocNav.querySelectorAll('.toc-link');
  const scrolledToBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100);

  if (scrolledToBottom) {
    const lastHeading = headings[headings.length - 1];
    if (lastHeading) {
      updateActiveLink(tocLinks, lastHeading.id);
    }
  }
}

/**
 * Cleanup scrollspy observer
 */
export function destroyScrollspy() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  headings = [];
  window.removeEventListener('scroll', handleScrollEnd);
}
