/**
 * Footnotes Module
 * Creates popovers from templates and handles single-open behavior
 * Templates are used in the shortcode to avoid breaking paragraph structure
 * (Positioning handled by CSS anchor positioning)
 */

let toggleHandler = null;
let createdPopovers = [];

/**
 * Handle popover toggle events
 * Close other popovers when one opens
 */
function handleToggle(e) {
  const popover = e.target;
  if (!popover.classList.contains('footnote-content')) return;

  if (e.newState === 'open') {
    // Close other open popovers
    document.querySelectorAll('.footnote-content:popover-open').forEach((other) => {
      if (other !== popover) {
        other.hidePopover();
      }
    });
  }
}

/**
 * Create popovers from templates and append to body
 * This avoids block elements breaking paragraph structure
 * CSS anchor positioning works because it uses named anchors
 */
function createPopoversFromTemplates() {
  document.querySelectorAll('template[data-footnote-template]').forEach((template) => {
    const id = template.dataset.footnoteTemplate;

    // Skip if popover already exists
    if (document.getElementById(id)) return;

    // Clone template content and append to body
    const popover = template.content.firstElementChild.cloneNode(true);
    document.body.appendChild(popover);
    createdPopovers.push(popover);
  });
}

/**
 * Initialize footnotes
 */
export function initFootnotes() {
  // Clean up first
  destroyFootnotes();

  // Create popovers from templates
  createPopoversFromTemplates();

  // Add toggle handler for single-open behavior
  toggleHandler = handleToggle;
  document.addEventListener('toggle', toggleHandler);
}

/**
 * Cleanup footnotes
 */
export function destroyFootnotes() {
  if (toggleHandler) {
    document.removeEventListener('toggle', toggleHandler);
    toggleHandler = null;
  }

  // Remove created popovers
  createdPopovers.forEach((popover) => {
    popover.remove();
  });
  createdPopovers = [];
}
