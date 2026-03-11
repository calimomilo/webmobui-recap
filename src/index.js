// Elements
import './elements/artist-cover.js'
import './elements/song-item.js'
import './elements/search-bar.js'
import './elements/spot-footer.js'
// Pages
import './pages/page-artists.js'
import './pages/page-home.js'
import './pages/page-player.js'
import './pages/page-artist-songs.js'
import './pages/page-search-songs.js'
import './pages/page-favorite-songs.js'

const router = () => {
  const main = document.querySelector('main')
  const hashs = (window.location.hash || '#home').split('/')

  if (hashs[0] === '#home')
    main.innerHTML = '<page-home />'
  
  else if (hashs[0] === '#player')
    main.innerHTML = '<page-player />'

  else if (hashs[0] === '#artists' && !hashs[1])
    main.innerHTML = '<page-artists />'

  else if (hashs[0] === '#artists')
    main.innerHTML = `<page-artist-songs artist-id="${hashs[1]}" />`

  else if (hashs[0] === '#search')
    main.innerHTML = `<page-search-songs query="${decodeURIComponent(hashs[1])}" />`

  else if (hashs[0] === '#favorites')
    main.innerHTML = '<page-favorite-songs />'

}

const setupOfflineMode = () => {
  const body = document.querySelector('body');
  const searchButton = document.querySelector('#search-trigger');
  const searchInput = document.querySelector('#search-input');

  window.addEventListener('offline', () => {
    body.classList.add('offline');
    searchButton.setAttribute('disabled', "");
    searchInput.classList.remove('active');
  })

  window.addEventListener('online', () => {
    body.classList.remove('offline');
    searchButton.removeAttribute('disabled');
  })
}

const connectServiceWorkers = () => {
  navigator.serviceWorker.register('/stale-while-revalidating.js');
}

window.addEventListener('hashchange', router)

router()
setupOfflineMode()
connectServiceWorkers()