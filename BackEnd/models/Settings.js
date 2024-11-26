const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const setting_schema = new Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    dark_mode: {type: Boolean, required: true},
    notifications: {type: Boolean, require: true}
});

const setting_model = mongoose.model('Use_Setting', setting_schema);

module.exports = setting_model;