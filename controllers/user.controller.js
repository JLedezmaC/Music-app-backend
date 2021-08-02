const userService = require('../services/user.service')

const userController = {};

userController.create = async function (req, res, next) { // Creacion del usuario 
    try {
        const newUser = await userService.createUser(req.body); // se le pasan los datos por medio del body 
        return res.status(201).json({ newUser })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

userController.getUsers = async function (req, res, next) { // Obtener todos los usuarios
    try {
        const users = await userService.getUsers(); // se llama a la funcion que obtiene todos los usuarios 
        return res.status(200).json({ status: 200, data: users, message: "Successfully users retrieved" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}

userController.getUser = async function (req, res, next) { // Obtener usuario especifico 
    try {
        const user = await userService.getUser(req.params); // Obtiene los datos por medio de la url 
        if (user == null) { // Si lo que retorna la funcion get user es null retorne un error que diga que no se puede encontar el usuario 
            return res.status(200).json({ message: "Cannot find user" });
        }
        return res.status(200).json({ status: 200, data: user, message: "Successfully user retrieved" }) // Si lo que retorna esta bien devuelva user
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}

userController.updateUser = async function (req, res, next) {  // Actualizar usuario 
    try {
        const updateUser = await userService.updateUser(req.params, req.body); // Se obtienen los datos por medio de los parametros de la url y del body 
        return res.status(200).json({ status: 200, data: updateUser, message: "Successfully user retrieved" })
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}


userController.updateUserName = async function (req, res, next) {  // Actualizar SOLO el nombre del usuario 
    try {
        const updateUserName = await userService.updateUserName(req.params, req.body); // Se obtienen los datos por medio de los parametros de la url y del body 
        return res.status(200).json({ status: 200, data: updateUserName, message: "Successfully user name updated" })
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}

userController.login = async function(req,res,next){  // Iniciar sesion del usuario 
    try{
        const userLogIn = await userService.LogUser(req.body); // Se obtienen los datos por medio del body 
        return res.status(200).json({ status: 200, Userdata: userLogIn});
    }catch(error){
        throw new Error('Error while loging user');
    }
}

userController.delete = async function (req, res, next) { // Eliminar el usuario 
    try {
        const userToRemove = await userService.removeUser(req.body); // Se obtienen los datos por medio del body 
        return res.status(201).json({ userToRemove });
    } catch (error) {
        throw new Error('Error while deleting user or user was deleted');
    }
};


module.exports = userController;