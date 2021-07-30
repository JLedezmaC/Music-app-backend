const express = require('express');
const songController = require('../controllers/song.controller');

const router = express.Router();

router.post('/song', songController.create);

module.exports = router;