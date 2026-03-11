# WebMobUI - Projet Spotlified recap
Structure de départ pour le recap du projet Spotlified du cours [WebMobUI](https://github.com/lgavillet/webmobui).
## Objectif
L'objectif est d'obtenir une application web fonctionnelle déployée sur Netlify similaire à celle-ci : https://calimomilo-spotlified.netlify.app/

L'état final de l'exercice devrait ressembler au repo suivant : https://github.com/calimomilo/webmobui-projet
## Programme
### Initialisation
forker et cloner ce repo

pour installer les dépendances : `npm install`

pour lancer le serveur : `npm start`
### Comprendre la structure des fichiers
suit plus ou moins le modèle MVC
- à la racine : comment on interagit avec certains éléments : API, player, LocalStorage
- dossiers `elements` et `pages` : comment on affiche les pages (+ intéraction avec ces pages)
- `index.js` : routeur → définit quelle page on affiche en fonction de l'url (`index.js`)
### Router
fonction `router()`
- récupère le hash de l'url → sépare en plusieurs parties
- opérateur par défaut `||`
- en fonction du contenu du hash, change le contenu du main

eventListener `hashchange` → appelle `router`

⇒ pourquoi est-ce qu'on appelle `router()` en bas de la page ?
### Custom HTML
- `page-home.js` → utilisation d'une classe pour créer un élément HTML custom
- `spot-footer.js` → logique de l'affichage du footer en fonction de la page ; balise `<a>` passe la valeur de `href` dans le hash quand on clique dessus
- modification de `router()`
### Artistes et API
- `api.js` → `fetchJson()` pour faciliter la compréhension des autres fonctions
-  `page-artists.js` → récupérer les données depuis l'API ; passer des variables à un élément HTML avec les attributs
- `artist-cover.js` → récupérer les variables des attributs
### Chansons d'un artiste
- `page-songs.js` _version simplifiée_ → itération du tableau ; pourquoi pas un bout de HTML?
- `song-item.js` → création de `CustomEvent()`
### Player
- `player.js` → qques fonctions utiles pour interagir avec le player (play, next, previous) ; ajouter l'eventListener sur le bouton
- `page-player.js` → expliquer les différents eventListeners
### Search
- `search-bar.js` → passer la recherche dans le hash, `encodeURIComponent()`
- mtn si on voulait créer la page de résultats de la recherche, elle serait extrêmement similaire à `page-songs` ⇒ idée de créer une classe parent commune
### PageSongs
- `page-songs.js` on enlève les éléments pas en commun : attributs, titre, `getSongs()`
- `page-artist-songs` et `page-search-songs` héritent de cette classe
- création des fonctions `getTitle()` et `getSongsData()` dans les pages spécifiques
- `page-artist-songs` → besoin d'accéder au résultat de la requête dans `getTitle()`, mais les éléments ne sont plus liés, nécessaire de passer par un attribut de la classe
- !! ajouter les imports des nouvelles pages dans `index.js`!!
### Favoris
- `local-storage.js` → fonctions pour interagir avec localStorage ; gérer le clic + affichage
- `page-favorite-songs.js` → hérite aussi  de PageSongs
### Fichier manifest
- images dans le dossier `public` pour qu'elles soient accessibles telles quelles
- `manifest.webmanifest` → dans le dossier `public` ; infos de base pour pouvoir déployer comme webapp ; ajouter le lien dans `index.html`
### Mode offline
- `index.js` → ajouter les eventListeners ; changement de couleur et bouton recherche ; test dans le navigateur
### Service Worker
- `stale-while-revalidating.js` → pour mettre en cache au fur et a mesure qu'on visite

ajouter le service workers dans `index.js`
### Déploiement
si repo pas forké :
- initialisation du repo local → `git init`
- création du repo distant sur GitHub → commandes proposées par github

création d'un compte netlify avec github, marche à suivre proposée
### Notifs push
onesignal : connecter avec Github ; marche à suivre proposée
-  `OneSignalSDKWorker.js` → ajout du code de l'autre service worker ; 1 seul service worker peut être lié à la fois