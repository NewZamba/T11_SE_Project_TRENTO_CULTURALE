const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favorite_shema = new Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    id_event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    }
});

const favorite_model = mongoose.model('Favorite', favorite_shema);

module.exports = favorite_model;