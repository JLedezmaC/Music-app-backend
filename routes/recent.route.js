const express = require('express');
const recentController = require('../controllers/recent.controller');

const router = express.Router();

router.put('/recent', recentController.upsert);
router.get('/recent', recentController.getRecent);

module.exports = router;