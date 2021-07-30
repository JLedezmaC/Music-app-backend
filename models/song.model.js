const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    album: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    audio: {
        type: String,
        required: true,
    },
}, { versionKey: false, autoCreate: true });

const Song = mongoose.model('Song', songSchema);
module.exports = Song;