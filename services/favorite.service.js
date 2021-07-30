const Favorite = require('../models/favorite.model');
const mongoose = require('mongoose');

const favoriteService = {}

async function findUser(userId) {
    try {
        const user = Favorite.findOne({ userId: mongoose.Types.ObjectId(userId) })
        return user ? user : null;

    } catch (error) {
        throw new Error('Error while getting user')
    }
}

async function createFavorite(userId, songs) {
    try {
        const favorite = new Favorite({ userId, songs })
        const newFavorite = await favorite.save();
        return newFavorite;
    } catch (error) {
        throw new Error('Error while save favorite')
    }
}

async function updateFavorite(user, songs) {
    try {
        user.songs.push(songs.toString());
        await user.save();
        return user;

    } catch (error) {
        throw new Error('Error while update favorite')
    }
}

favoriteService.upsertFavorite = async function ({ userId, songs }) {
    try {
        const user = await findUser(userId);
        if (user) {
            return await updateFavorite(user, songs);
        }
        return await createFavorite(userId, songs);

    } catch (error) {
        throw new Error('Error while save Favorite')
    }
}

favoriteService.getFavorite = async function ({ userId }) {
    console.log(userId)
    try {
        const favorite = await Favorite.findOne({ userId: new mongoose.Types.ObjectId(userId) }).populate('songs');
        return favorite;
    } catch (error) {
        throw new Error(error.message);
    }
};

async function deleteFavorite(user, song) {
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

favoriteService.delete = async function ({ userId, song }) {
    try {
        const user = await findUser(userId)
        if (user) {
            return deleteFavorite(user, song)
        }
    } catch (e) {
        // Log Errors
        console.log('Error Message', e.message)
        throw Error('Error while save Favorite Music')
    }
}

module.exports = favoriteService;