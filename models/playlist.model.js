const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, // trae el id creado por mongo 
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    songs: [String]
}, { versionKey: false });

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;