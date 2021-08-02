const favoriteService = require('../services/favorite.service');

const FavoriteController = {}

FavoriteController.upsert = async function (req, res, next) {
    try {
        const upsertFavorite = await favoriteService.upsertFavorite(req.body); // Agregando lista de favoritos 
        return res.status(201).json({ data: upsertFavorite })  // retornando data de la lista de favoritos, si dicha sale de manera exitosa

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

FavoriteController.get = async function (req, res, next) {
    try {
        const userId = req.query.userId;  // obtiene el id de el usuario por medio de la URL pasado com variable despues del signo ?
        const favorite = await favoriteService.getFavorite({ userId }); // obtenemos la lista de favoritos de ese id especifico 
        return res.status(200).json({ data: favorite, message: 'Successfully favorite retrieved' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = FavoriteController;