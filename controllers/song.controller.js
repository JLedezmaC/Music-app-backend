const songService = require('../services/song.service');

const songController = {};

songController.create = async function (req, res, next) {
    try {
        const newSong = await songService.createSong(req.body);
        return res.status(201).json({ newSong });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = songController;