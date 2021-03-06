var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');

var app = express();

var db = require('./db');
var passport = require('./init/passport');

var articleCreateController = require('./controllers/article-create');
var userController = require('./controllers/user-view');
var userLoginController = require('./controllers/users/user-login');
var userRegisterController = require('./controllers/users/user-register');
var userLogoutController = require('./controllers/users/user-logout');
var userFailController = require('./controllers/fail');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'SECRET' }));
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  debug: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/login', userLoginController);
app.use('/register', userRegisterController);
app.use('/logout', userLogoutController);
app.use('/user', userController);
app.use('/fail', userFailController);

app.use('/article', articleCreateController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.disable('etag');

module.exports = app;
