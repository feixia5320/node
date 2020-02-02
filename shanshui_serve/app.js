var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser');
// var index = require('./routes/index');
//链接mongodb数据库
var mongoose = require('./routes/mongoconnect');
var users = require('./routes/users');
var news = require('./routes/news');
var {addVisit, iprouter} = require('./routes/ip')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 新加入的
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//http://localhost:3000/logo.jpg
app.use(express.static(path.join(__dirname, 'public')));
//http://localhost:3000/uploads/logo.jpg
app.use('/uploads',express.static(path.join(__dirname, 'uploads')))

app.use(function (req, res, next) {
  addVisit(req);
  if (req.cookies.userId) {
    next();
  } else {
    if (req.originalUrl == '/users/login' || req.originalUrl == '/users/logout' 
      || req.originalUrl.indexOf('/news/getnews') > -1 || req.originalUrl.indexOf('/ip') > -1) {
      next();
    } else {
      res.json({
        status: '10001',
        msg: '当前未登录',
        result: ''
      });
    }
  }
});

// app.use('/', index);
app.use('/users', users);
app.use('/news', news);
app.use('/ip', iprouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
