var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var article = require('./../models/article');

var Article = mongoose.model('Article', article);

/* GET home page. */
router.get('/', function(req, res, next) {
  Article.find(function (err, articles) {
    if(err) {
      res.send('Error!');
    } else {
      res.render('index', { title: 'News aggregator', articles: articles, user: req.user });
    }
  }).sort({publishedAt: -1});
});

module.exports = router;
