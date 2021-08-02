const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { // un campo de nombre de tipo string 
        type: String,
        required: true
    },
    email: { // un campo de email de tipo string 
        type: String,
        required: true
    },
    password: { // un campo de password de tipo string 
        type: String,
        required: true
    }
}, { versionKey: false })

const User = mongoose.model('User', userSchema)
module.exports = User;