// Trabajar todo lo que tiene que ver con la base de datos pero solo de usuarios 

const mongoose = require('mongoose');
const Schema = mongoose.Schema; // schema es la estrucutrua como lo que hicimos en robo3t, schema es como base de datos es donde se define todo lo que va a tener el usuario 


const userSchema = new Schema({ // esta creando una instancia de schema 
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
},{versionKey : false}) // ese versionkey es para eliminar el __v de cada user que se envia 

const user = mongoose.model('User',userSchema) // es como para decirle a mongoose que ese va a ser el modelo como va estar definido 
module.exports = user;
