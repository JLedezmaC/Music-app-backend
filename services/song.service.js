const Song = require('../models/song.model');

const songService = {};

songService.createSong = async function ({ id, name, album, image, audio }) {

    try {
        const song = new Song({ id, name, album, image, audio });
        const newSong = await song.save();
        return newSong;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = songService;