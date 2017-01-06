var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('./../models/user');

var User = mongoose.model('User', user);

router.all('/', function(req, res, next) {
    req.isAuthenticated()
        ? next()
        : res.redirect('/');
});

router.route('/*').all(function(req, res, next) {
    req.isAuthenticated()
        ? next()
        : res.redirect('/');
});

router.get('/', function(req, res, next) {
    res.render('user', {title: 'News aggregator', user: req.user });
});

module.exports = router;
