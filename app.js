var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var data = require('./routes/data');
var clients = require('./routes/clients');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// it's important that express validator is called after bodyParser
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// secret:set secret length 
// saveUninitialized: only save to sessio storage if session is initialized
// resave: only save session is we change something
// DEFAULT STORAGE IS IN MEMORY... NOT RECOMMENDED FOR PRODUCTION!
// MUST SAVE TO A SERVER FOR PRODUCTION
// SEE EXPRESS SESSION REPO FOR OPTIONS
app.use(expressSession({secret:'max', saveUninitialized: false, resave: false}));

app.use('/', index);
app.use('/users', users);
app.use('/data', data);
app.use('/clients', clients);

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

module.exports = app;
