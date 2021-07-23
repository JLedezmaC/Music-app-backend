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

FavoriteController.get = async function (req, res, next) {
    try {
        const userId = req.query.userId;
        const favorite = await favoriteService.getFavorite({ userId });
        return res.status(200).json({ data: favorite, message: 'Successfully favorite retrieved' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = FavoriteController;