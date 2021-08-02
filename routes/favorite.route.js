const express = require('express');
const favoriteController = require('../controllers/favorite.controller');

const router = express.Router(); // Se llama a express y se pone router para poder usar las rutas 

// El metodo, luego la ruta de la url y el controlador al cual va a ser llamado 
router.put('/favorite', favoriteController.upsert);
router.get('/favorite', favoriteController.get);

module.exports = router;