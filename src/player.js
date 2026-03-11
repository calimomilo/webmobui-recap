// Tag audio
const audioPlayer = document.querySelector('#audio-player')

let currentSongList = [];
let currentSong = null;

const playSong = (song, songs) => {
  currentSong = song;
  if (songs) {
    currentSongList = songs;
  }

  // On donne l'url au player et démarre la lecture
  audioPlayer.src = currentSong.audio_url;
  audioPlayer.play();
}

// Lis la chanson suivante, d'après la chanson en cours
const playNextSong = () => {
  let newIndex = currentSongList.indexOf(currentSong) + 1

  if (newIndex == currentSongList.length)
    newIndex = 0

  playSong(currentSongList[newIndex])
}

// Lis la chanson précédente, d'après la chanson en cours
const playPreviousSong = () => {
  let newIndex = currentSongList.indexOf(currentSong) - 1

  if (newIndex == -1)
    newIndex = currentSongList.length - 1

  playSong(currentSongList[newIndex])
}

export { audioPlayer, currentSong, playSong, playNextSong, playPreviousSong }
