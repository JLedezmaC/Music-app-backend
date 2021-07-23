const favoriteService = require('../services/favorite.service');

const FavoriteController = {}

FavoriteController.upsert = async function (req, res, next) {
    try {
        const upsertFavorite = await favoriteService.upsertFavorite(req.body);
        return res.status(201).json({ data: upsertFavorite })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

module.exports = FavoriteController;