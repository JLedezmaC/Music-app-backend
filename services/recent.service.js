const Recent = require('../models/recent.model');
const mongoose = require('mongoose');

const recentService = {}

async function findUser(userId) {
    try {
        const user = Recent.findOne({ userId: mongoose.Types.ObjectId(userId) })
        return user ? user : null;

    } catch (error) {
        throw new Error('Error while getting user')
    }
}

async function createRecent(userId, songs) {
    try {
        const recent = new Recent({ userId, songs })
        const newRecent = await recent.save();
        return newRecent;
    } catch (error) {
        throw new Error('Error while save favorite')
    }
}

async function updateRecent(user, songs) {
    try {
        songs.forEach(songs => {
            user.songs.unshift(songs.toString());
        });
        await user.save();
        return user;

    } catch (error) {
        throw new Error('Error while update favorite')
    }
}

recentService.upsertRecent = async function ({ userId, songs }) {
    try {
        const user = await findUser(userId);
        if (user) {
            return await updateRecent(user, songs);
        }
        return await createRecent(userId, songs);

    } catch (error) {
        throw new Error('Error while save Favorite')
    }
}

recentService.getRecent = async function ({ userId }) {
    try {
        const recent = await Recent.findOne({ userId: mongoose.Types.ObjectId(userId) });
        return recent.songs;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = recentService;