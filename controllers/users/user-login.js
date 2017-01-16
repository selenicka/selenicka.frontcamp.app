var express = require('express');
var router = express.Router();
var passport = require('passport');
var user = require('./../../models/user');

router.route('/').get(function(req, res, next) {
    res.json({title: 'News aggregator'});
});

router.route('/').post(function(req, res, next) {
    passport.authenticate('local',
        function(err, user, info) {
            return err
                ? next(err)
                : user
                    ? req.login(user, function(err) {
                        return err
                            ? next(err)
                            : res.redirect('/user');
                        })
                    : res.redirect('/fail');
        }
    )(req, res, next);
});

module.exports = router;
