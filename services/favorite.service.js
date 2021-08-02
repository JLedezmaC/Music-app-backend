const Favorite = require('../models/favorite.model');
const mongoose = require('mongoose');

const favoriteService = {}

async function findUser(idUser) {
    try {
        const user = Favorite.findOne({ idUser: mongoose.Types.ObjectId(idUser) })   // Encontrar en el schema de favorite un id de usuario igual al que le estamos pasando
        return user ? user : null;  // Operador ternario si lo encuentra lo devuelve si no es null 
    } catch (error) {
        throw new Error('Error while getting user')
    }
}

async function createFavorite(idUser, songs) {  // creacion de lista de favoritos 
    try {
        const favorite = new Favorite({ idUser, songs })  // crear un nuevo objeto con ese id y las canciones que le pasemos 
        const newFavorite = await favorite.save();  // Guarda el nuevo objeto 
        return newFavorite; // returna el nuevo objeto 
    } catch (error) {
        throw new Error('Error while save favorite')
    }
}

async function updateFavorite(user, songs) {
    try {
        user.songs.push(songs.toString()); // actualiza la lista de favortios de un usuario especifico 
        await user.save(); // guarda dicha lista 
        return user;

    } catch (error) {
        throw new Error('Error while update favorite')
    }
}

favoriteService.upsertFavorite = async function ({ idUser, songs }) {
    try {
        const user = await findUser(idUser);  // Llama a la funcion find user para encontrar al usuario con ese id 
        if (user) {
            return await updateFavorite(user, songs); // si existe  lo retorna 
        }
        return await createFavorite(idUser, songs); // si no crea una lista de favoritos

    } catch (error) {
        throw new Error('Error while save Favorite')
    }
}

favoriteService.getFavorite = async function ({ userId }) {
    try {
        const favorite = await Favorite.find({ userId }); // Buscar y encontrar la lista de favortios con el id del usuario
        return favorite; // retorna la lista encontrada 
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = favoriteService;