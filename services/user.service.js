// los servicios son aquellos que nos permiten coenctar lo que el usuario quiere con la base de datos, es utilizado como para decir que va a manejar los usuarios y la base de datos

const User = require('../models/user.models')

const userService = {}

userService.createUser = async function({name,email,password}){ // async es para decir que tiene que esperar a que algo suceda y await es que tiene que esperar a que async se ejecute 
    try{
        const user = new User ({name,email,password}) // crea el usuario
        const newUser = await user.save(); // salva el usuario o mas bien lo guarda 
        return newUser;  // retorna el usuario
    } catch (e){
        throw new Error ('Error while save user')
    }
}
// Este es para traer todos los usuarios creados 

userService.getUsers = async function(){
    try{
        const users = await  User.find({})
        return users;
    }catch(error){
        throw new Error ('Error while Paginating Users')
    }
}

userService.LogUser = async function(email,password){
    try{
        const logedUser = await User.findOne({email,password})
        return logedUser;
    }catch(error){
        throw new Error ('Error while getting User')
    }
}

module.exports = userService;
// el try y el catch nos permite manejar errores 
// y se lee asi try es como intente ejecutar el codigo y si da un error mandelo al catch 