const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tag_schema = new Schema({
    name_tag: { type: String, required: true, unique: true },
    color_tag: { type: String, default: '#000000' }
});

const tag_model = mongoose.model('Tag', tag_schema);

module.exports = tag_model;