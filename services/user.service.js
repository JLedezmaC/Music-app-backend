const User = require('../models/user.model');
const md5 = require('md5');

const userService = {};

async function verificate(email){
    const actualEmail =  await User.findOne({email});
    if(actualEmail){
        return true;
    }
}

userService.createUser = async function ({ name, email, password }) {
    try {
        const emailVerification = await verificate(email);
        if(!emailVerification){
            const user = new User({ name, email, password:md5(password)});
            const newUser = await user.save();
            return newUser;
        }else{
            return emailVerification;
        }
    } catch (e) {
        console.log(e.message)
        throw new Error('Error while save user')
    }
}

userService.getUsers = async function () {
    try {
        const users = await User.find({}); // Este tipo de objeto vacio lo que me hace es traerme todos los usuarios que existen 
        return users;   // retornar todos los usuarios 

    } catch(e) {
        console.log(e.message)
        throw new Error('Error while Paginating Users')
    }
}

userService.getUser = async function ({ id }) { // obtener usuario en especifico 
    try {
        const user = await User.findById(id) // encuentre por medio del id el usuario 
        let getUser = JSON.parse(JSON.stringify(user))  // el parse lo que me indica es que lea lo que tiene adentro como un objeto JS  y el stringyfy convierte el objeto JS en JSON
        delete getUser.password; // gracias a el parse  podemos obtener el campo de password y eliminarlo esto para que no me retorne la contrasena 
        return  getUser
    } catch (e) {
        console.log(e.message)
        throw new Error('Error while returning user');
    }
}

userService.updateUser = async function ({ id }, { name, email, password }) { // Se obtiene el id de la URL y lo demas del body 
    try {
        const user = await User.findById(id); // Se busca y se encuentra el usuario por medio del id 
        const updateUser = await user.set({ name, email, password }); // Se le cambia a ese usuario el name ,email,password
        await updateUser.save(); // Se guartda con los cambios 
        return updateUser; // Se retorna 
    } catch (e) {
        console.log(e.message)
        throw new Error('Error while update user')
    }
}

userService.updateUserName = async function ({ id }, { name }) { // Se obtiene el id de la URL y lo demas del body 
    try {
        const userid = await User.findById(id); // Se busca el usuario con ese id 
        const updateNameUser = await userid.set({ name }); // Se le cambia a ese usuario el name el metodo set hace que podamos hacerlo 
        await updateNameUser.save(); // se guarda el usuario actualizado 
        return updateNameUser; // se retorna el usuario actualizado 
    } catch (e) {
        console.log(e.message)
        throw new Error('Error while changing name of user')
    }
}

userService.LogUser = async function({email,password}){ // Se obtienen los datos 
    try{
        const logedUser = await User.findOne({email}) // Se busca el usuario con ese email 
        const passwordHashed = md5(password);  // Se encrypta la contrasena que estamos pasando 
        if(logedUser){ // Si encuentra un usuario con ese correo 
            if(passwordHashed === logedUser.password){ // Si la contrasena encryptada es igual a la contrasena que esta en la db
                return logedUser; // retorne el usuario 
            }else{
                return false; // retorne false (este ejecuta un mensaje  en el front end )
            }
        }else{
            return true; // retorne true  (este ejecuta un mensaje  en el front end )
        }
    }catch(e){
        console.log(e.message)
        throw new Error ('Error while getting User')
    }
}

userService.removeUser = async function (data) { // Eliminar usuario 
    try {
        const Userid = data._id;  // obtenemos el id de ese usuario
        const userDeleted = await User.findByIdAndRemove(Userid); // Encontramos el id y lo removemos 
        const message = 'User removed'; // se devuelve un mensaje confirmando que el usuario fue elimnado 
        return message;
    } catch (e) {
        console.log(e.message);
        throw new Error(error);
    }
};


module.exports = userService;