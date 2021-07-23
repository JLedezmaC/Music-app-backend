const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')

router.post('/user',userController.create);
//Aqui van los metodos de api como get post put delete

router.get('/user',userController.login);

// Aqui me va a traer los usuarios 

router.get('/user',userController.getUser)

module.exports = router