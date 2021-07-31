const recentService = require('../services/recent.service');

const RecentController = {}

RecentController.upsert = async function (req, res, next) {
    try {
        const upsertRecent = await recentService.upsertRecent(req.body);
        return res.status(201).json({ data: upsertRecent })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

RecentController.getRecent = async function (req, res, next) {
    try {
        const userId = req.query.userId;
        const recent = await recentService.getRecent({ userId });
        return res.status(200).json({ data: recent, message: 'Successfully playlist retrieved' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = RecentController;