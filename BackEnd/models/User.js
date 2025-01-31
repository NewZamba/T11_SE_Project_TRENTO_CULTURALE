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
    google_id: {type: String, sparse: true}, // sparse: se il valore non viene assegnato l'utente non lo avra'
    ban_until_date: {type: Date},
});

const user_model = mongoose.model('User', user_schema);

module.exports = user_model;