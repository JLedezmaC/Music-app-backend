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

FavoriteController.deleteFavorite = async function (req, res, next) {
    try {
        const favorite = await favoriteService.delete(req.params)
        return res.status(202).json({ status: 202, data: favorite, message: "Item removed successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

module.exports = FavoriteController;