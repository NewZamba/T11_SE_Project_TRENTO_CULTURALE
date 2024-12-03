const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_schema = new Schema({
    name_user: {type: String, required: true},
    surname_user: {type: String, required: true},
    age_user: {type: Number},
    email_user: {type: String, required: true},
    pass_user: {type: String, required: true},
    phone_user: {type: String},
    type_user: {type: Number, required: true},
});

const User_model = mongoose.model('User', user_schema);

module.exports = User_model;