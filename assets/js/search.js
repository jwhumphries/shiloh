(function() {
  const searchToggle = document.getElementById('search-toggle');
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  const searchResultsList = document.getElementById('search-results-list');
  const searchNoResults = document.getElementById('search-no-results');
  const searchLoading = document.getElementById('search-loading');

  if (!searchToggle || !searchModal || !searchInput) return;

  let fuse = null;

  async function loadSearchIndex() {
    if (fuse) return;

    searchLoading.classList.remove('hidden');
    searchResultsList.innerHTML = '';
    searchNoResults.classList.add('hidden');

    try {
      const searchIndexUrl = searchModal.getAttribute('data-search-index') || '/index.json';
      const response = await fetch(searchIndexUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const searchData = await response.json();

      if (typeof Fuse === 'undefined') {
        throw new Error('Fuse.js is not loaded');
      }

      fuse = new Fuse(searchData, {
        keys: [
          { name: 'title', weight: 2.0 },
          { name: 'content', weight: 0.2 },
          { name: 'tags', weight: 1.0 },
          { name: 'categories', weight: 1.0 }
        ],
        threshold: 0.4,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2,
        ignoreLocation: true
      });
    } catch (error) {
      console.error('Failed to load search index:', error);
      searchResultsList.innerHTML = '<p class="text-error">Failed to load search index</p>';
    } finally {
      searchLoading.classList.add('hidden');
    }
  }

  function mergeIndices(indices) {
    if (indices.length === 0) return [];
    const sorted = [...indices].sort((a, b) => a[0] - b[0]);
    const merged = [sorted[0]];
    for (let i = 1; i < sorted.length; i++) {
      const last = merged[merged.length - 1];
      const current = sorted[i];
      if (current[0] <= last[1] + 1) {
        last[1] = Math.max(last[1], current[1]);
      } else {
        merged.push(current);
      }
    }
    return merged;
  }

  function highlightMatches(text, matches, offset = 0) {
    if (!matches || matches.length === 0) return escapeHtml(text);

    const indices = matches.flatMap(m => m.indices);
    if (indices.length === 0) return escapeHtml(text);

    const adjustedIndices = indices
      .map(([start, end]) => [start - offset, end - offset])
      .filter(([start, end]) => end >= 0 && start < text.length)
      .map(([start, end]) => [Math.max(0, start), Math.min(text.length - 1, end)]);

    const merged = mergeIndices(adjustedIndices);

    let result = '';
    let lastIndex = 0;

    merged.forEach(([start, end]) => {
      if (start >= lastIndex) {
        result += escapeHtml(text.substring(lastIndex, start));
        result += `<mark class="bg-primary/20 text-base-content font-medium px-0.5 rounded">${escapeHtml(text.substring(start, end + 1))}</mark>`;
        lastIndex = end + 1;
      }
    });

    result += escapeHtml(text.substring(lastIndex));
    return result;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function getContentPreview(content, matches) {
    if (!matches || matches.length === 0) {
      return { text: content.substring(0, 150), offset: 0 };
    }

    const contentMatches = matches.find(m => m.key === 'content');
    if (!contentMatches || !contentMatches.indices[0]) {
      return { text: content.substring(0, 150), offset: 0 };
    }

    const firstMatchStart = contentMatches.indices[0][0];
    const start = Math.max(0, firstMatchStart - 75);
    const end = Math.min(content.length, firstMatchStart + 150);
    const preview = content.substring(start, end);

    return {
      text: (start > 0 ? '...' : '') + preview + (end < content.length ? '...' : ''),
      offset: start - (start > 0 ? 3 : 0)
    };
  }

  function displayResults(results) {
    searchResultsList.innerHTML = '';
    searchNoResults.classList.add('hidden');

    if (results.length === 0) {
      searchNoResults.classList.remove('hidden');
      return;
    }

    results.slice(0, 10).forEach(result => {
      const doc = result.item;
      const matches = result.matches || [];

      const titleMatches = matches.filter(m => m.key === 'title');
      const highlightedTitle = highlightMatches(doc.title, titleMatches);

      const { text: previewText, offset: previewOffset } = getContentPreview(doc.content, matches);
      const contentMatches = matches.filter(m => m.key === 'content');
      const highlightedContent = highlightMatches(previewText, contentMatches, previewOffset);

      const resultElement = document.createElement('div');
      resultElement.className = 'card bg-base-200 hover:bg-base-300 transition-colors';
      resultElement.innerHTML = `
        <div class="card-body p-4">
          <h4 class="card-title text-base">
            <a href="${doc.uri}" class="link link-hover text-primary">${highlightedTitle}</a>
          </h4>
          <p class="text-sm text-base-content/70 line-clamp-2">${highlightedContent}</p>
          ${doc.tags && doc.tags.length > 0 ? `
            <div class="flex gap-2 mt-2 flex-wrap">
              ${doc.tags.slice(0, 3).map(tag => `<span class="badge badge-sm badge-primary">${tag}</span>`).join('')}
            </div>
          ` : ''}
        </div>
      `;
      searchResultsList.appendChild(resultElement);
    });
  }

  function performSearch(query) {
    if (!fuse || query.length < 2) {
      searchResultsList.innerHTML = '';
      searchNoResults.classList.add('hidden');
      return;
    }

    try {
      const results = fuse.search(query);
      displayResults(results);
    } catch (error) {
      console.error('Search error:', error);
      searchResultsList.innerHTML = '<p class="text-error">Search error occurred</p>';
    }
  }

  searchToggle.addEventListener('click', () => {
    searchModal.showModal();
    loadSearchIndex();
    setTimeout(() => searchInput.focus(), 100);
  });

  searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value);
  });

  searchModal.addEventListener('close', () => {
    searchInput.value = '';
    searchResultsList.innerHTML = '';
    searchNoResults.classList.add('hidden');
  });
})();
