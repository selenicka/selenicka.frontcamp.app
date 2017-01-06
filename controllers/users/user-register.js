var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('./../../models/user');

var User = mongoose.model('User', user);

router.route('/').get(function(req, res, next) {
    res.render('user-add', {title: 'News aggregator'});
});

router.route('/').post(function(req, res, next) {
    var data = req.body;

    User.findOne({ username : data.username }, function(err, user){
        if(user) {
            res.send('User with such username has already existed!');
        } else {
            var newUser = new User({
                username: data.username,
                password: data.password,
                lastname: data.lastname
            });

            newUser.save(function (err) {
                return err
                    ? next(err)
                    : req.login(newUser, function (err) {
                        return err
                            ? next(err)
                            : res.redirect('/user');
                    });
            });
        }
    });
});

module.exports = router;
