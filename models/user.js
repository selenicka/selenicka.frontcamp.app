var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: {type: String, default: Date.now()},
    username: String,
    password: String,
    avatar: String
});

module.exports = userSchema;