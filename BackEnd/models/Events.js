const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const event_schema = new Schema({
    name_event: {type: String, required: true},
    location_event: {type: String, required: true},
    date_event: {type: Date, required: true},
    tag_event: {
        type: Number,
        required: true
    },
    description_event: {type: String, required: true},
    img_event: {type: String, required: false}
});

const event_model = mongoose.model('Event', event_schema);

module.exports = event_model;