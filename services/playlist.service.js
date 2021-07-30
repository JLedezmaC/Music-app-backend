const Playlist = require('../models/playlist.model');
const mongoose = require('mongoose');

const playlistService = {};

async function findUser(userId) {
    try {
        const user = await Playlist.findOne({ userId: new mongoose.Types.ObjectId(userId) })
        return user ? user : null;

    } catch (error) {
        throw new Error(error)
    }
}

playlistService.createPlaylist = async function ({ userId, songs, name }) {

    try {
        const user = await findUser(userId);
        console.log(user)
        if (user) {
            const playlist = new Playlist({ userId, songs, name });
            const newPlaylist = await playlist.save();
            return newPlaylist;
        }
    } catch (error) {
        throw new Error(error);
    }
};

playlistService.getPlaylist = async function ({ userId }) {
    try {
        const playlists = await Playlist.find({ userId });
        return playlists;
    } catch (error) {
        throw new Error(error.message);
    }
};

playlistService.updatePlaylist = async function (data) {
    try {
        const id = data.id;
        const playlist = await Playlist.findById(id);
        if (data.name) playlist.name = data.name;
        if (data.songs) playlist.songs = data.songs;
        await playlist.save();
        return playlist;
    } catch (error) {
        throw new Error(error);
    }
};

playlistService.removePlaylist = async function (data) {
    try {
        const id = data.id;
        const playlist = await Playlist.findByIdAndRemove(id);
        const message = 'Playlist remove';
        return message;
    } catch (error) {
        throw new Error(error);
    }
};

async function deleteSong(user, song) {
    try {
        user.songs.pull(song);
        user.save()
        return user;
    } catch (e) {
        // Log Errors
        console.log('Error Message', e.message)
        throw Error('Error while delete Favorite Music')
    }
}

playlistService.delete = async function ({ userId, song }) {
    try {
        const user = await findUser(userId)
        if (user) {
            return deleteSong(user, song)
        }
    } catch (e) {
        // Log Errors
        console.log('Error Message', e.message)
        throw Error('Error while save Favorite Music')
    }
}

module.exports = playlistService;