import { getSongs } from "../api.js";
import { PageSong } from "./page-songs.js";

customElements.define("page-artist-songs", class extends PageSong {
  static observedAttributes = ['artist-id']

  async getSongsData() {
    const artistId = this.getAttribute('artist-id');
    return getSongs(artistId);
  }

  getTitle() {
    return `Artistes > ${this.songs[0].artist.name}`;
  }
})