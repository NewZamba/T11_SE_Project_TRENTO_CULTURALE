const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment_schema = new Schema({
    id_event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required:true
    },
    id_Parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: false
    },
    text: {type: String, required: true},
    date: {type: Date, required: true},
    user_name: {type: String, required: false},
    z_index : {type: Number, required: true},



});

const evaluation_model = mongoose.model('Comment', Comment_schema);

module.exports = evaluation_model;