import { getFavorites } from "../local-storage.js";
import { PageSong } from "./page-songs.js";

customElements.define("page-favorite-songs", class extends PageSong {
  async getSongsData() {
    return getFavorites();
  }

  getTitle() {
    return `Favoris`;
  }
})