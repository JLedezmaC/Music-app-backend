const playlistService = require('../services/playlist.service');

const playlistController = {};

playlistController.create = async function (req, res, next) { // Creacion de playlist 
    try {
        const newPlaylist = await playlistService.createPlaylist(req.body); // se obtienen los datos enviados por el usuario
        return res.status(201).json({ newPlaylist });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

playlistController.getPlaylist = async function (req, res, next) { // Obtener playlist 
    try {
        const userId = req.query.userId; // se obtiene el id por medio de la url 
        const playlists = await playlistService.getPlaylist({ userId }); // se le pasa al servicio especificado el id del usuario
        return res.status(200).json({ data: playlists, message: 'Successfully playlist retrieved' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

playlistController.update = async function (req, res, next) { // Actualizar playlist 
    try {
        const playlist = await playlistService.updatePlaylist(req.body);  // se le pasan los datos al servicio especificado por medio en este caso de un body
        return res.status(201).json({ playlist });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

playlistController.delete = async function (req, res, next) { // Eliminar playlist 
    try {
        const playlist = await playlistService.removePlaylist(req.body); // obtenemos los datos por medio del body (usuario)
        return res.status(201).json({ playlist });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

playlistController.deleteSong = async function (req, res, next) { // Eliminar cancion 
    try {
        const playlist = await playlistService.delete(req.params)  // Se obtienen los dato por medio de la url
        return res.status(202).json({ status: 202, data: playlist, message: "Item removed successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

module.exports = playlistController;