const express = require('express');
const routerPlaylist = express.Router();
const playlistController = require('../controllers/playlist.controller');

routerPlaylist.post('/playlists', playlistController.create);
routerPlaylist.get('/playlists', playlistController.getPlaylist);
routerPlaylist.put('/playlists', playlistController.update);
routerPlaylist.delete('/playlists/:id', playlistController.delete);
routerPlaylist.delete('/playlist/:id/song/:song', playlistController.deleteSong)

module.exports = routerPlaylist;