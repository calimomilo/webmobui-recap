// simplifier l'intéraction avec localStorage

const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

const removeItem = (key) => {
    localStorage.removeItem(key);
}

// interaction avec les favoris
const FAVORITES_KEY = 'favorites'

const getFavorites = () => {
    return getItem(FAVORITES_KEY) ?? [];
}

const addFavorite = (song) => {
    const favs = getFavorites();
    favs.push(song);
    setItem(FAVORITES_KEY, favs);
}

const getFavorite = (id) => {
    const favs = getFavorites();
    return favs.find(el => el.id === id);
}

const removeFavorite = (id) => {
    const favs = getFavorites();
    const newFavs = favs.filter(el => el.id !== id);
    setItem(FAVORITES_KEY, newFavs);
}

const toggleFavorite = (song) => {
    getFavorite(song.id) ? removeFavorite(song.id) : addFavorite(song);
}

export { toggleFavorite, getFavorites, getFavorite }