var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

//import file di api
var indexRouter = require('./routes/index');
var caricaDati = require('./routes/caricaDati');
var login = require('./routes/login');
var addUser = require('./routes/addUser');
var addEvent = require('./routes/addEvent');
var addFavorite = require('./routes/addFavorite');
var users = require('./routes/users');
var events = require('./routes/events');

//connesione al database
mongoose.connect(`mongodb+srv://fraCok:fraCok@cluster0.c9u75.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/caricaDati',caricaDati);
app.use('/login',login);
app.use('/addUser',addUser);
app.use('/addEvent',addEvent);
app.use('/addFavorite',addFavorite);
app.use('/users',users);
app.use('/events',events);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
