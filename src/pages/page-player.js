import { audioPlayer, playSong, currentSong, playNextSong, playPreviousSong } from '../player.js'
import formatTimestamp from '../lib/formatTimestamp.js'

customElements.define("page-player", class extends HTMLElement {
  updatingTime = true;

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div id="player">
        <div id="player-thumbnail">
          <!-- utiliser l'id de cet élément pour changer la cover de la chanson -->
          <img src="http://placecats.com/200/300" id="player-thumbnail-image" />
        </div>

        <div id="player-infos">
          <div id="player-infos-song">
            <span class="material-icons">music_note</span>
            <!-- utiliser l'id de cet élément pour changer le titre de la chanson -->
            <span id="player-infos-song-title">
              -
            </span>
          </div>

          <div id="player-infos-artist">
            <span class="material-icons">person</span>
            <!-- utiliser l'id de cet élément pour changer le nom de l'artiste -->
            <span id="player-infos-artist-name">
              -
            </span>
          </div>
        </div>

        <div id="player-controls">
          <!-- utiliser l'id de cet élément pour ajouter un listener pour le click sur précédent -->
          <button type="button" class="player-control player-control-small" id="player-control-previous">
            <span class="material-icons">skip_previous</span>
          </button>
          <!-- utiliser l'id de cet élément pour ajouter un listener pour le click sur play/pause -->
          <button type="button" class="player-control" id="player-control-play">
            <span class="material-icons">play_arrow</span>
          </button>
          <!-- utiliser l'id de cet élément pour ajouter un listener pour le click sur suivant -->
          <button type="button" class="player-control player-control-small" id="player-control-next">
            <span class="material-icons">skip_next</span>
          </button>
        </div>

        <div id="player-progress">
          <input type="range" id="player-progress-bar" value="0" />
          <div id="player-times">
            <!-- utiliser l'id de cet élément pour changer le temps écoulé -->
            <span id="player-time-current">--:--</span>
            <!-- utiliser l'id de cet élément pour changer la durée totale -->
            <span id="player-time-duration">--:--</span>
          </div>
        </div>
      </div>
      `

    this.selectElements();
    this.addEventListeners();
    this.updatePlayerInfos();
  }

  // sélection des éléments HTML
  selectElements() {
    // infos de la chanson
    this.songImage = this.querySelector('#player-thumbnail-image');
    this.songTitle = this.querySelector('#player-infos-song-title');
    this.songArtist = this.querySelector('#player-infos-artist-name');

    // boutons principaux
    this.playButton = this.querySelector('#player-control-play');
    this.nextButton = this.querySelector('#player-control-next');
    this.prevButton = this.querySelector('#player-control-previous');

    // progress bar et affichage du temps
    this.progressBar = this.querySelector('#player-progress-bar');
    this.timeCurrent = this.querySelector('#player-time-current');
    this.timeDuration = this.querySelector('#player-time-duration');
  }

  // ajoute les eventListeners
  addEventListeners() {
    this.updatePlayerInfos = this.updatePlayerInfos.bind(this);
    this.updateCurrentTime = this.updateCurrentTime.bind(this);
    this.updatePlayButton = this.updatePlayButton.bind(this);

    // Change les infos quand une nouvelle chanson est chargée
    audioPlayer.addEventListener('loadeddata', this.updatePlayerInfos)

    // Change l'affichage du bouton play
    audioPlayer.addEventListener('play', this.updatePlayButton)
    audioPlayer.addEventListener('pause', this.updatePlayButton)

    // Change l'affichage du temps écoulé
    audioPlayer.addEventListener('timeupdate', this.updateCurrentTime)
    
    // Interaction avec les boutons principaux
    this.playButton.addEventListener('click', () => {
      if(!currentSong) return
      audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause()
    })
    this.nextButton.addEventListener('click', playNextSong)
    this.prevButton.addEventListener('click', playPreviousSong)

    // Interaction avec la progress bar
    this.progressBar.addEventListener('change', () => {
      audioPlayer.currentTime = this.progressBar.value;
      this.updatingTime = true;
    })
    this.progressBar.addEventListener('mousedown', () => this.updatingTime = false)
    this.progressBar.addEventListener('input', () => {
      if (!currentSong) return
      this.timeCurrent.innerText = formatTimestamp(this.progressBar.value);
    })

  }

  // Mise à jour des différentes infos de la plage player d'après la chanson en cours
  updatePlayerInfos() {
    if (!currentSong) return
    // infos de la chanson
    this.songImage.src = currentSong.artist.image_url;
    this.songTitle.textContent = currentSong.title;
    this.songArtist.textContent = currentSong.artist.name;

    // durée de la chanson
    this.timeDuration.textContent = formatTimestamp(audioPlayer.duration);
    this.progressBar.max = audioPlayer.duration;

    this.updatePlayButton();
    this.updateCurrentTime();
    
  }

  // Mise à jour de l'affichage du temps écoulé
  updateCurrentTime() {
    if (this.updatingTime) {
      this.timeCurrent.textContent = formatTimestamp(audioPlayer.currentTime);
      this.progressBar.value = audioPlayer.currentTime;
    }
  }

  // Mise à jour de l'affichage du bouton play/pause
  updatePlayButton() {
    this.playButton.querySelector('span').textContent = audioPlayer.paused ? 'play_arrow' : 'pause';

    // if (audioPlayer.isPaused) {
    //   this.playButton.querySelector('span').textContent = 'play_arrow';
    // } else {
    //   this.playButton.querySelector('span').textContent = 'pause';
    // }
  }
})