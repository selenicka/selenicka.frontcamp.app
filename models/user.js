var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    //_id: {type: String, default: Date.now()},
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lastname: String,
    avatar: String
});

module.exports = userSchema;