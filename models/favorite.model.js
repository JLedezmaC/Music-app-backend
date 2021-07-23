const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = mongoose.Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        require: true
    },
    songs: [String]
}, { versionKey: false });

const Favorite = mongoose.model('Favorite', FavoriteSchema);
module.exports = Favorite;