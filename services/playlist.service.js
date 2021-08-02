const Playlist = require('../models/playlist.model');
const mongoose = require('mongoose');

const playlistService = {};

async function findUser(userId) {
    try {
        const user = await Playlist.findOne({ userId: mongoose.Types.ObjectId(userId) }) // lo que hace es que pasa el user id a un object id y luego se le pasa abajo y lo que hace es que cuando lo pases a mongo se va a mostrar como el object id porque se lo pasaste asi y en el model esta configurado asi 
        return user ? user : null; // ternario si da true se retorna user si no null 

    } catch (error) {
        throw new Error(error)
    }
}

playlistService.createPlaylist = async function ({ userId, songs, name }) { // Se extrae el id del usuario, las canciones y el nombre

    try {
        const user = await findUser(userId);  // se llama a la funcion find user y se le pasa el id 
        if (user) { // si encuentra un usuario 
            const playlist = new Playlist({ userId, songs, name }); // se llama al schema y se crea un nuevo objeto con los datos especificados
            const newPlaylist = await playlist.save(); // se guarda el nuevo objeto 
            return newPlaylist;  // se retorna 
        }
    } catch (error) {
        throw new Error(error);
    }
};

playlistService.getPlaylist = async function ({ userId }) {
    try {
        const playlists = await Playlist.find({ userId }); // se busca en la db una playlist con ese id 
        return playlists; // se retorna la lista 
    } catch (error) {
        throw new Error(error.message);
    }
};

playlistService.updatePlaylist = async function (data) {
    try {
        const id = data.id;  // se extrae el id de la data 
        const playlist = await Playlist.findById(id); // busque por id y encuentre una lista con ese id 
        if (data.name) playlist.name = data.name; // si el data.name es true el playlist.name va a ser igual al data.name
        if (data.songs) playlist.songs = data.songs;// si el data.songs es true el playlist.songs va a ser igual al data.songs
        await playlist.save(); // se guarda la lista modificada
        return playlist; // se retorna 
    } catch (error) {
        throw new Error(error);
    }
};

playlistService.removePlaylist = async function (data) { // se obtiene data 
    try { 
        const id = data.id;  // se extrae el id de la data 
        const playlist = await Playlist.findByIdAndRemove(id); // se busca y se elimina la playlist por medio del id 
        const message = 'Playlist removed'; // se crea un mensaje de que fue eliminada 
        return message; //se retorna dicho mensaje
    } catch (error) {
        throw new Error(error);
    }
};

async function deleteSong(user, song) {
    try {
        user.songs.pull(song); // se hace un pull de la cancion especificada, el metodo pull logra hacer que se elimine una cancion en especifica 
        user.save() // se guardan los cambios con la cancion eliminada 
        return user; // retorna el objeto 
    } catch (e) {
        console.log('Error Message', e.message)
        throw Error('Error while delete Favorite Music')
    }
}

playlistService.delete = async function ({ userId, song }) {
    try {
        const user = await findUser(userId) // se llama a la funcion finduser y se le pasa el id del usuario 
        if (user) { // si el usuario existe 
            return deleteSong(user, song)  // se llama a la funcion deletesong 
        }
    } catch (e) {
        // Log Errors
        console.log('Error Message', e.message)
        throw Error('Error while save Favorite Music')
    }
}

module.exports = playlistService;