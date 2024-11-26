const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prenotation_schema = new Schema({
    id_prenotation: {type: Number, required: true},
    id_event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    }
});

const prenotation_model = mongoose.model('Prenotation', prenotation_schema);

module.exports = prenotation_model;   