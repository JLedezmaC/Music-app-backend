const express = require('express');
const routerPlaylist = express.Router();
const playlistController = require('../controllers/playlist.controller');

routerPlaylist.post('/playlists', playlistController.create);
routerPlaylist.get('/playlists', playlistController.getPlaylist);
routerPlaylist.put('/playlists', playlistController.update);

module.exports = routerPlaylist;