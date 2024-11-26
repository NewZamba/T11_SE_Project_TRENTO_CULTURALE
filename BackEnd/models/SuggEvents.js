const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const suggEvent_schema = new Schema({
    id_event: {type: Number, required: true},
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    name_event: {type: String, required: true},
    date_event: {type: Date, required: true},
    tag_event: {
        type: String, 
        enum: ['tag1', 'tag2', 'tag3'], 
        required: true
    },
    description_event: {type: String, required: true},
    img_event: {type: String, required: true}
});

const suggEvent_model = mongoose.model('Suggested_Event', suggEvent_schema);

module.exports = suggEvent_model;