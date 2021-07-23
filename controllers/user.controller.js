// Este lo que va a hacer es manejar el request que venga del usuario

const userService = require('../services/user.service')

const userController = {};

userController.create = async function(req,res,next){  // va a crear un usario y tiene que ser async porque tiene que esperar a que la base de datos crea el usario
    try{
        const newUser = await userService.createUser(req.body)
        return res.status(201).json({newUser})
    }catch(e){
        return res.status(400).json({status:400, message: e.message})
    }
}

userController.getUser = async function(req,res,next){
    try{
        const users = await userService.getUsers();
        return res.status(200).json({status:200,data:users,message:"Successfully users retrieved"})
    }catch(e){
        return res.status(400).json({status:400, message: e.message})
    }
}

userController.login = async function(req,res,next){
    try{
        const userLogIn = await userService.LogUser(req.body);
        return res.status(200).json({ status: 200, data: userLogIn, message: 'Successfully user log in' });
    }catch(error){
        throw new Error('Error while loging user');
    }
}


module.exports = userController;