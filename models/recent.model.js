const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecentSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId, // el id va a ser guardado como objectid en la db 
        require: true
    },
    songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }], // Un array de tipo string 
}, { versionKey: false, autoCreate: true });

const Recent = mongoose.model('Recent', RecentSchema);
module.exports = Recent;