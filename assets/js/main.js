/**
 * Shiloh Theme - Main JavaScript
 */

import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';
import SwupScrollPlugin from '@swup/scroll-plugin';
import SwupA11yPlugin from '@swup/a11y-plugin';
import SwupProgressPlugin from '@swup/progress-plugin';

// Import local modules
import { initCodeCopy } from './modules/code-copy.js';
import { initScrollspy, destroyScrollspy } from './modules/scrollspy.js';
import { initScrollToTop } from './modules/scroll-to-top.js';

// Initialize swup
const swup = new Swup({
  containers: ['#swup'],
  animationSelector: '#swup',
  cache: true,
  animateHistoryBrowsing: true,
  native: false,

  ignoreVisit: (url, { el } = {}) => {
    // Ignore links with data-no-swup attribute
    if (el?.closest('[data-no-swup]')) {
      return true;
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
      scrollFunction: (target, options) => {
        const start = window.scrollY;
        const end = typeof target === 'number' ? target : target.getBoundingClientRect().top + start - (options?.offset || 0);
        const duration = 400; // milliseconds
        const startTime = performance.now();

        return new Promise((resolve) => {
          function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            window.scrollTo(0, start + (end - start) * eased);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              resolve();
            }
          }
          requestAnimationFrame(step);
        });
      }
    }),
    new SwupA11yPlugin(),
    new SwupProgressPlugin()
  ]
});

// Initialize page scripts
function initPageScripts() {
  initCodeCopy();
  initScrollspy();
  initScrollToTop(swup);
}

// Cleanup before content replacement
function cleanupPageScripts() {
  destroyScrollspy();
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
