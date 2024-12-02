const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const crypto = require('crypto');
const cors = require('cors');

//import file di api
var indexRouter = require('./routes/index');
var caricaDati = require('./routes/caricaDati');
var login = require('./routes/login');
var addUser = require('./routes/addUser');
var addEvent = require('./routes/addEvent');
var addFavorite = require('./routes/addFavorite');
var users = require('./routes/users');
var events = require('./routes/events');
var registration = require('./routes/registration');
var isLoggedTest = require('./routes/isLoggedTest');


//connesione al database
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.c9u75.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(url);

var app = express();

// enable cors
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Crea una sessione (biscotti temporanei)
app.use(session({
  secret: crypto.randomBytes(32).toString('hex'),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    secure: false //TODO: false per i test, True per quando il progetto e' finito
  }
}));

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
app.use('/registration',registration);
app.use('/isLoggedTest',isLoggedTest);

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
