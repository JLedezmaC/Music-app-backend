const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, // el id va a ser guardado como objectid en la db 
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    songs: [String] // Un array de tipo string 
}, { versionKey: false });

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;