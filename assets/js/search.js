(function() {
  const searchToggle = document.getElementById('search-toggle');
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  const searchResultsList = document.getElementById('search-results-list');
  const searchNoResults = document.getElementById('search-no-results');
  const searchLoading = document.getElementById('search-loading');

  if (!searchToggle || !searchModal || !searchInput) return;

  let lunrIndex = null;
  let searchData = null;

  async function loadSearchIndex() {
    if (lunrIndex) return;

    searchLoading.classList.remove('hidden');
    searchResultsList.innerHTML = '';
    searchNoResults.classList.add('hidden');

    try {
      const response = await fetch('/lunr-index.json');
      const data = await response.json();

      searchData = data;
      lunrIndex = lunr(function() {
        this.ref('uri');
        this.field('title', { boost: 10 });
        this.field('content');
        this.field('tags', { boost: 5 });
        this.field('categories', { boost: 5 });

        data.forEach(doc => this.add(doc));
      });
    } catch (error) {
      console.error('Failed to load search index:', error);
      searchResultsList.innerHTML = '<p class="text-error">Failed to load search index</p>';
    } finally {
      searchLoading.classList.add('hidden');
    }
  }

  function displayResults(results) {
    searchResultsList.innerHTML = '';
    searchNoResults.classList.add('hidden');

    if (results.length === 0) {
      searchNoResults.classList.remove('hidden');
      return;
    }

    results.slice(0, 10).forEach(result => {
      const doc = searchData.find(d => d.uri === result.ref);
      if (!doc) return;

      const resultElement = document.createElement('div');
      resultElement.className = 'card bg-base-200 hover:bg-base-300 transition-colors';
      resultElement.innerHTML = `
        <div class="card-body p-4">
          <h4 class="card-title text-base">
            <a href="${doc.uri}" class="link link-hover text-primary">${doc.title}</a>
          </h4>
          <p class="text-sm text-base-content/70 line-clamp-2">${doc.content.substring(0, 150)}...</p>
          ${doc.tags && doc.tags.length > 0 ? `
            <div class="flex gap-2 mt-2">
              ${doc.tags.slice(0, 3).map(tag => `<span class="badge badge-sm badge-primary">${tag}</span>`).join('')}
            </div>
          ` : ''}
        </div>
      `;
      searchResultsList.appendChild(resultElement);
    });
  }

  function performSearch(query) {
    if (!lunrIndex || query.length < 2) {
      searchResultsList.innerHTML = '';
      searchNoResults.classList.add('hidden');
      return;
    }

    try {
      const results = lunrIndex.search(query + '*');
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
