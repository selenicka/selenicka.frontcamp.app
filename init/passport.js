var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var mongoose = require('mongoose');
var user = require('./../models/user');

var User = mongoose.model('User', user);

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function(username, password, done){
    
    User.findOne({ username : username }, function(err,user){
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        if (password !== user.password) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        return done(null, user);
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user){
        err
            ? done(err)
            : done(null,user);
    });
});

module.exports = passport;