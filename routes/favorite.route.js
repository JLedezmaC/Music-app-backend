const express = require('express');
const favoriteController = require('../controllers/favorite.controller');

const router = express.Router();

router.put('/favorite', favoriteController.upsert);
router.get('/favorite', favoriteController.get);

module.exports = router;