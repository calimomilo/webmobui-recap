import { getArtists } from "../api.js"

customElements.define("page-artists", class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h4>Artistes</h4>

      <artist-list>
      </artist-list>
    `;
    const artistList = this.querySelector('artist-list');

    getArtists()
    .then((artists) => {
      // console.log(artists);
      artists.forEach(artist => {
        artistList.innerHTML += `
          <artist-cover id="${artist.id}" name="${artist.name}" cover="${artist.image_url}" />
        `
      });
    })    
  }
})
