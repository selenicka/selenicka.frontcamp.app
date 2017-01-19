var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var article = require('./../models/article');
var fs = require('fs');
var publicDir = './public/images/';
var multer  = require('multer');
var upload = multer({ dest: 'public/images' });

var Article = mongoose.model('Article', article);

router.route('/').get(function(req, res, next) {
    res.redirect('/articles');
});

/*router.route('/add').get(function(req, res, next) {
    if (req.user) {
        res.json({title: 'News aggregator', user: req.user});
    } else {
        res.send('You are not logged in.');
    }
});*/

router.post('/save', upload.single('image'), function(req, res, next) {
    var data = req.body;
    console.log(data);
    
    /*if (!req.file) {
        res.send('No files were uploaded.');
        return;
    }

    var ext = req.file.originalname.split('.');
    ext = ext[ext.length - 1];
    var src = req.file.filename + '.' + ext;

    fs.rename(publicDir + req.file.filename, publicDir + src, (err) => {
        if (err) throw err;
        console.log('renamed complete');
    });*/

    /*var author = req.user.lastname;
    if (!author) {
        author = req.user.username;
    }*/

    var article = new Article({
        title: data.title,
        source: data.source,
        //author: author,
        description: data.content,
        //image: src
    });

    article.save(function (err) {
        return err
            ? res.json({status: 'error'})
            : res.json({status: 'ok'})
    });
});

router.route('/:id').get(function(req, res, next) {
    Article.findOne({_id: req.params.id}, function (err, article) {
        if(err) {
            res.json({ status: 'error'});
        } else {
            res.json({title: 'News aggregator', article: article, user: req.user, status: 'ok'});
        }
    });

});

router.route('/delete/:id').get(function(req, res, next) {
    Article.findOne({_id: req.params.id}).remove(function (err) {
        if(err) {
            res.json({ status: 'error'});
        } else {
            res.json({title: 'News aggregator', user: req.user, status: 'ok'});
        }
    });

});

module.exports = router;
