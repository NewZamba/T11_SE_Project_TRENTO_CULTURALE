const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evaluation_schema = new Schema({
    comment: {type: String, required: true},
    id_event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true},
    rating: {
        type: Number,
        required: true
    }
});

const evaluation_model = mongoose.model('Event_Evaluation', evaluation_schema);

module.exports = evaluation_model;