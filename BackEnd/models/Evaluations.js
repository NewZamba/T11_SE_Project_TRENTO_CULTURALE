const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evaluation_schema = new Schema({
    id_event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true},
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

const evaluation_model = mongoose.model('Event_Evaluation', evaluation_schema);

module.exports = evaluation_model;