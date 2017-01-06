var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    _id: {type: String, default: Date.now()},
    title:  String,
    author: String,
    description:   String,
    publishedAt: { type: Date, default: Date.now },
    image: String
});

articleSchema.methods.formatDate = function (date) {
    let MM = {0:"January", 1:"February", 2:"March", 3:"April", 4:"May", 5:"June", 6:"July", 7:"August", 8:"September", 9:"October", 10:"November", 11:"December"};

    return `${ date.getDate() } ${ MM[date.getMonth()] } ${ date.getFullYear() }`;
};

module.exports = articleSchema;