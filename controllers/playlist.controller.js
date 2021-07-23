const playlistService = require('../services/playlist.service');

const playlistController = {};

playlistController.create = async function (req, res, next) {
    try {
        const newPlaylist = await playlistService.createPlaylist(req.body);
        return res.status(201).json({ newPlaylist });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

playlistController.getPlaylist = async function (req, res, next) {
    try {
        const userId = req.query.userId;
        const playlists = await playlistService.getPlaylist({ userId });
        return res.status(200).json({ data: playlists, message: 'Successfully playlist retrieved' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

playlistController.update = async function (req, res, next) {
    try {
        const playlist = await playlistService.updatePlaylist(req.body);
        return res.status(201).json({ playlist });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = playlistController;