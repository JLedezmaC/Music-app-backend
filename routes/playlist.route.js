const express = require('express');
const routerPlaylist = express.Router(); // Se llama a express y se pone router para poder usar las rutas 
const playlistController = require('../controllers/playlist.controller');

// El metodo, luego la ruta de la url y el controlador al cual va a ser llamado 
routerPlaylist.post('/playlists', playlistController.create);
routerPlaylist.get('/playlists', playlistController.getPlaylist);
routerPlaylist.put('/playlists', playlistController.update);
routerPlaylist.delete('/playlists', playlistController.delete);

module.exports = routerPlaylist;