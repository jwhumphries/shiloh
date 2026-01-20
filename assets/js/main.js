/**
 * Shiloh Theme - Main JavaScript
 */

import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';
import SwupScrollPlugin from '@swup/scroll-plugin';
import SwupA11yPlugin from '@swup/a11y-plugin';
import SwupProgressPlugin from '@swup/progress-plugin';
import SwupFragmentPlugin from '@swup/fragment-plugin';
import SwupSlideTheme from '@swup/slide-theme';

// Import local modules
import { initCodeCopy } from './modules/code-copy.js';
import { initScrollspy, destroyScrollspy } from './modules/scrollspy.js';
import { initScrollToTop } from './modules/scroll-to-top.js';
import { initFootnotes, destroyFootnotes } from './modules/footnotes.js';

// Initialize swup
const swup = new Swup({
  containers: ['#swup'],
  cache: true,
  animateHistoryBrowsing: true,
  native: false,

  ignoreVisit: (url, { el } = {}) => {
    // Ignore links with data-no-swup attribute
    if (el?.closest('[data-no-swup]')) {
      return true;
    }
    // Ignore hash-only links (e.g., href="#section")
    // These are same-page anchors and should scroll, not navigate
    if (url.hash) {
      const currentPath = window.location.pathname.replace(/\/$/, '');
      const targetPath = url.pathname.replace(/\/$/, '');
      if (currentPath === targetPath) {
        return true;
      }
    }
    // Ignore external links (only check if origin exists)
    if (url.origin && url.origin !== window.location.origin) {
      return true;
    }
    // Ignore file downloads
    const fileExtensions = /\.(pdf|zip|png|jpg|jpeg|gif|svg|webp|doc|docx|xls|xlsx)$/i;
    if (fileExtensions.test(url.pathname)) {
      return true;
    }
    return false;
  },

  plugins: [
    new SwupHeadPlugin(),
    new SwupPreloadPlugin(),
    new SwupScrollPlugin({
      animateScroll: {
        betweenPages: true,
        samePageWithHash: true,
        samePage: true
      },
      offset: 16, // Small offset for visual breathing room
      // Scroll function signature: (context, targetY, startY, animate, onStart, onEnd)
      scrollFunction: (_ctx, targetY, startY, _animate, onStart, onEnd) => {
        const duration = 400; // milliseconds
        const startTime = performance.now();

        if (onStart) onStart();

        return new Promise((resolve) => {
          function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            window.scrollTo(0, startY + (targetY - startY) * eased);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              if (onEnd) onEnd();
              resolve();
            }
          }
          requestAnimationFrame(step);
        });
      }
    }),
    new SwupFragmentPlugin({
      rules: [
        {
          from: '(.*)',
          to: '(.*)',
          containers: ['#articles'],
          // Only use fragment replacement for pagination links
          if: (visit) => visit.trigger.el?.hasAttribute('data-pagination-direction')
        }
      ]
    }),
    new SwupA11yPlugin(),
    new SwupProgressPlugin(),
    new SwupSlideTheme()
  ]
});

// Initialize page scripts
function initPageScripts() {
  initCodeCopy();
  initScrollspy();
  initScrollToTop(swup);
  initFootnotes();
}

// Cleanup before content replacement
function cleanupPageScripts() {
  destroyScrollspy();
  destroyFootnotes();
}

// Initialize on first load
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initPageScripts();
} else {
  document.addEventListener('DOMContentLoaded', initPageScripts);
}

// Reinitialize after swup navigation
swup.hooks.on('page:view', initPageScripts);

// Cleanup before content replacement
swup.hooks.on('content:replace', cleanupPageScripts);

// Close search modal when navigation starts
swup.hooks.on('visit:start', (visit) => {
  const searchModal = document.getElementById('search-modal');
  if (searchModal && searchModal.open) {
    searchModal.close();
  }

  // Detect direction for sliding animation based on data-pagination-direction attribute
  const clickedLink = visit.trigger.el;
  if (clickedLink) {
    const direction = clickedLink.getAttribute('data-pagination-direction');
    if (direction === 'next') {
      document.documentElement.classList.add('is-animating-next');
      document.documentElement.classList.remove('is-animating-prev');
    } else if (direction === 'prev') {
      document.documentElement.classList.add('is-animating-prev');
      document.documentElement.classList.remove('is-animating-next');
    } else {
      // Reset if not pagination
      document.documentElement.classList.remove('is-animating-next', 'is-animating-prev');
    }
  }
});

// Clean up animation direction classes after navigation completes
swup.hooks.on('visit:end', () => {
  document.documentElement.classList.remove('is-animating-next', 'is-animating-prev');
});
