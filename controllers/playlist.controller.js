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

playlistController.getPlaylistId = async function (req, res, next) {
    try {
        const playlist = await playlistService.getPlaylistId(req.params);
        return res.status(200).json({ playlist });
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

playlistController.delete = async function (req, res, next) {
    try {
        const playlist = await playlistService.removePlaylist(req.params);
        return res.status(201).json({ playlist });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

playlistController.deleteSong = async function (req, res, next) {
    try {
        const playlist = await playlistService.delete(req.params)
        return res.status(202).json({ status: 202, data: playlist, message: "Item removed successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

module.exports = playlistController;