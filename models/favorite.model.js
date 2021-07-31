const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        require: true
    },
    songs: [{ type: String, required: true }],
}, { versionKey: false, autoCreate: true });

const Favorite = mongoose.model('Favorite', FavoriteSchema);
module.exports = Favorite;