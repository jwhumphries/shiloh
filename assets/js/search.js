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
      const response = await fetch('/search-data.json');
      const searchData = await response.json();

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

  function highlightMatches(text, matches) {
    if (!matches || matches.length === 0) return text;

    const indices = matches.flatMap(m => m.indices);
    if (indices.length === 0) return text;

    indices.sort((a, b) => a[0] - b[0]);

    let result = '';
    let lastIndex = 0;

    indices.forEach(([start, end]) => {
      if (start >= lastIndex) {
        result += text.substring(lastIndex, start);
        result += `<mark class="bg-secondary/30 text-secondary-content px-0.5 rounded">${text.substring(start, end + 1)}</mark>`;
        lastIndex = end + 1;
      }
    });

    result += text.substring(lastIndex);
    return result;
  }

  function getContentPreview(content, matches) {
    if (!matches || matches.length === 0) {
      return content.substring(0, 150);
    }

    const contentMatches = matches.find(m => m.key === 'content');
    if (!contentMatches || !contentMatches.indices[0]) {
      return content.substring(0, 150);
    }

    const firstMatchStart = contentMatches.indices[0][0];
    const start = Math.max(0, firstMatchStart - 75);
    const end = Math.min(content.length, firstMatchStart + 75);
    const preview = content.substring(start, end);

    return (start > 0 ? '...' : '') + preview + (end < content.length ? '...' : '');
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

      const contentPreview = getContentPreview(doc.content, matches);
      const contentMatches = matches.filter(m => m.key === 'content');
      const highlightedContent = highlightMatches(contentPreview, contentMatches);

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
