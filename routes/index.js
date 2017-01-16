var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var article = require('./../models/article');

var Article = mongoose.model('Article', article);

/* GET home page. */
router.get('/', function(req, res, next) {
  Article.find(function (err, articles) {
    if(err) {
      res.json({ status: 'error'});
    } else {
      res.json({ title: 'News aggregator', articles: articles, user: req.user, status: 'ok'});
    }
  }).sort({publishedAt: -1});
});

module.exports = router;
