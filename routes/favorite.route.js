const express = require('express');
const favoriteController = require('../controllers/favorite.controller');

const router = express.Router();

router.put('/favorite', favoriteController.upsert);
router.get('/favorite', favoriteController.get);
router.delete('/favorite/:userId/song/:song', favoriteController.deleteFavorite)

module.exports = router;