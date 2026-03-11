customElements.define("search-bar", class extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div id="search-wrapper">
    <!-- ajouter la classe "active" à #search-input pour l'afficher-->
    <input id="search-input" type="search" spellcheck="false" autocapitalize="false" autofocus />

    <button id="search-trigger" class="icon-button" type="button">
      <span class="material-icons">search</span>
    </button>
    </div>`
  }
})

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-trigger');

searchButton.addEventListener('click', () => searchInput.classList.toggle('active'))
searchInput.addEventListener('change', () => window.location.hash = `#search/${encodeURIComponent(searchInput.value)}`)