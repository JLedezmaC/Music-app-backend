const Favorite = require('../models/favorite.model');
const mongoose = require('mongoose');

const favoriteService = {}

async function findUser(idUser) {
    try {
        const user = Favorite.findOne({ idUser: mongoose.Types.ObjectId(idUser) })
        return user ? user : null;

    } catch (error) {
        throw new Error('Error while getting user')
    }
}

async function createFavorite(idUser, songs) {
    try {
        const favorite = new Favorite({ idUser, songs })
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

favoriteService.upsertFavorite = async function ({ idUser, songs }) {
    try {
        const user = await findUser(idUser);
        if (user) {
            return await updateFavorite(user, songs);
        }
        return await createFavorite(idUser, songs);

    } catch (error) {
        throw new Error('Error while save Favorite')
    }
}

favoriteService.getFavorite = async function ({ userId }) {
    try {
        const favorite = await Favorite.find({ userId });
        return favorite;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = favoriteService;