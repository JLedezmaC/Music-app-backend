const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecentSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        require: true
    },
    songs: [{ type: String, required: true }],
}, { versionKey: false, autoCreate: true });

const Recent = mongoose.model('Recent', RecentSchema);
module.exports = Recent;