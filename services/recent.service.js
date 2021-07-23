const Recent = require('../models/recent.model');
const mongoose = require('mongoose');

const recentService = {}

async function findUser(idUser) {
    try {
        const user = Recent.findOne({ idUser: mongoose.Types.ObjectId(idUser) })
        return user ? user : null;

    } catch (error) {
        throw new Error('Error while getting user')
    }
}

async function createRecent(idUser, songs) {
    try {
        const recent = new Recent({ idUser, songs })
        const newRecent = await recent.save();
        return newRecent;
    } catch (error) {
        throw new Error('Error while save favorite')
    }
}

async function updateRecent(user, songs) {
    try {
        user.songs.unshift(songs.toString());
        await user.save();
        return user;

    } catch (error) {
        throw new Error('Error while update favorite')
    }
}

recentService.upsertRecent = async function ({ idUser, songs }) {
    try {
        const user = await findUser(idUser);
        if (user) {
            return await updateRecent(user, songs);
        }
        return await createRecent(idUser, songs);

    } catch (error) {
        throw new Error('Error while save Favorite')
    }
}

module.exports = recentService;