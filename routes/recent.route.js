const express = require('express');
const recentController = require('../controllers/recent.controller');

const router = express.Router();

router.put('/recent', recentController.upsert);

module.exports = router;