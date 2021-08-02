const Recent = require('../models/recent.model');
const mongoose = require('mongoose');

const recentService = {}

async function findUser(idUser) {
    try {
        const user = Recent.findOne({ idUser: mongoose.Types.ObjectId(idUser) })  // encuentra el usuario con el id especifico 
        return user ? user : null; // ternario si es true retorna al usuario si no retorna null 

    } catch (error) {
        throw new Error('Error while getting user')
    }
}

async function createRecent(idUser, songs) {
    try {
        const recent = new Recent({ idUser, songs }) // se crea un nuevo objeto de recientes 
        const newRecent = await recent.save(); // se guarda el nuevo objeto de recientes 
        return newRecent; // se retorna 
    } catch (error) {
        throw new Error('Error while save favorite')
    }
}

async function updateRecent(user, songs) { // Actualiza recientes 
    try {
        user.songs.unshift(songs.toString()); // se agrega la cancion al array del usuario especificado, agregando el elemento al inicio del array (unshift method)
        await user.save(); // se guarda con los nuevos cambios 
        return user;

    } catch (error) {
        throw new Error('Error while update favorite')
    }
}

recentService.upsertRecent = async function ({ idUser, songs }) { 
    try {
        const user = await findUser(idUser); // Se llama a la funcion find user y se le pasa el id especificado
        if (user) {  // si existe 
            return await updateRecent(user, songs); // se le pasa el id del usuario y la cancion 
        }
        return await createRecent(idUser, songs); // si no existe se crea los o el reciente 

    } catch (error) {
        throw new Error('Error while save Favorite')
    }
}

module.exports = recentService;