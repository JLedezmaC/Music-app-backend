const recentService = require('../services/recent.service');

const RecentController = {}

RecentController.upsert = async function (req, res, next) { // Cancion reciente 
    try {
        const upsertRecent = await recentService.upsertRecent(req.body); // se obtienen los datos por medio del body 
        return res.status(201).json({ data: upsertRecent })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

module.exports = RecentController;