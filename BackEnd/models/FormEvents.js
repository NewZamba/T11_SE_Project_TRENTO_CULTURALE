const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const event_schema = new Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    id_event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    name_event: {type: String, required: true},
    feedback: {type: String, required: true}
});

const event_model = mongoose.model('FormEvents', event_schema);

module.exports = event_model;