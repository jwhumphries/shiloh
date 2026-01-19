/**
 * Code Copy Button Module
 * Adds copy-to-clipboard functionality to code blocks
 */

const COPY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>`;
const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`;

/**
 * Initialize code copy buttons on all code blocks
 */
export function initCodeCopy() {
  const codeBlocks = document.querySelectorAll('.highlight pre');

  codeBlocks.forEach((codeBlock) => {
    // Skip if already wrapped
    if (codeBlock.parentNode.classList.contains('code-block-wrapper')) {
      return;
    }

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper relative group';
    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);

    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-btn btn btn-ghost btn-xs absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10';
    copyButton.setAttribute('aria-label', 'Copy code');
    copyButton.innerHTML = COPY_ICON;

    wrapper.appendChild(copyButton);

    // Handle click
    copyButton.addEventListener('click', () => {
      const code = codeBlock.querySelector('code');
      const text = code ? code.textContent : codeBlock.textContent;

      navigator.clipboard.writeText(text).then(() => {
        copyButton.innerHTML = CHECK_ICON;
        setTimeout(() => {
          copyButton.innerHTML = COPY_ICON;
        }, 2000);
      }).catch((err) => {
        console.error('Failed to copy:', err);
      });
    });
  });
}
