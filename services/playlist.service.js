const Playlist = require('../models/playlist.model');
const mongoose = require('mongoose');

const playlistService = {};

playlistService.createPlaylist = async function ({ userId, songs, name }) {

    try {
        const playlist = new Playlist({ userId, songs, name });
        const newPlaylist = await playlist.save();
        return newPlaylist;

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

playlistService.updatePlaylist = async function ({ id, name, songs }) {
    try {
        const playlist = await Playlist.findById(id);
        if (name) playlist.name = name;
        if (songs) playlist.songs.push(songs.toString());
        await playlist.save();
        return playlist;
    }
    catch (error) {
        throw new Error(error);
    }
};

playlistService.removePlaylist = async function ({ id }) {
    try {
        const playlist = await Playlist.findByIdAndRemove(id);
        return playlist;
    } catch (error) {
        throw new Error(error);
    }
};

playlistService.delete = async function ({ id, song }) {
    try {
        const playlist = await Playlist.findById(id);
        playlist.songs.pull(song);
        playlist.save();
        return playlist;
    } catch (error) {
        console.log('Error Message', error.message)
        throw Error(error)
    }
}


module.exports = playlistService;