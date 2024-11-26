const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evaluation_schema = new Schema({
    id_comment: {type: Number, required: true},
    comment: {type: String, required: true},
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true
    }
});

const evaluation_model = mongoose.model('Event_Evaluation', evaluation_schema);

module.exports = evaluation_model;