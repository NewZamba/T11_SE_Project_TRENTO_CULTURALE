const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prenotation_schema = new Schema({
    id_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required:true
    },
    id_event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    date_Prenotation: {type: Date, required: true},
});

const prenotation_model = mongoose.model('Prenotation', prenotation_schema);

module.exports = prenotation_model;   