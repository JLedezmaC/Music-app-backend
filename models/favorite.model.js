const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = mongoose.Schema({
    idUser: {
        type: Schema.Types.ObjectId, // el id va a ser guardado como objectid en la db 
        require: true
    },
    songs: [String] // Un array de tipo string 
}, { versionKey: false });

const Favorite = mongoose.model('Favorite', FavoriteSchema);
module.exports = Favorite;