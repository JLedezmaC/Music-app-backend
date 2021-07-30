const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
}, { versionKey: false, autoCreate: true });

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;