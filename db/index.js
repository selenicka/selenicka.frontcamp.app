var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://heroku_selenicka:alien503@ds061206.mlab.com:61206/heroku_5nnbsdwg', function () {
    console.log('connected...');
});

module.exports = connection;