const express = require('express');
const router = express.Router(); // Se llama a express y se pone router para poder usar las rutas 
const userController = require('../controllers/user.controller');

// El metodo, luego la ruta de la url y el controlador al cual va a ser llamado 
router.post('/user', userController.create); 
router.post('/user/login',userController.login); 
router.get('/user', userController.getUsers);
router.get('/user/:id', userController.getUser);
router.put('/user/:id', userController.updateUser);
router.put('/user/name/:id', userController.updateUserName);
router.delete('/user', userController.delete);

module.exports = router;