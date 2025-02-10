const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prenotation_schema = new Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required:true
    },
    id_event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    name_event: {
        type: String,
        required: true
    },
    date_Prenotation: {
        type: Date,
        required: true
    },
    date_event: {
        type: Date,
        required: true
    },
    form: {
        type: Boolean,
        default: false
    }
});

const prenotation_model = mongoose.model('Prenotation', prenotation_schema);

module.exports = prenotation_model;   