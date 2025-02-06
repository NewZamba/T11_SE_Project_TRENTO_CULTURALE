const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const crypto = require('crypto');
const cors = require('cors');
const passport = require("passport");

//import file di api
const indexRouter = require('./routes/index');
const addUser = require('./routes/addUser');
const addEvent = require('./routes/addEvent');
const addFavorite = require('./routes/addFavorite');
const users = require('./routes/users');
const events = require('./routes/events');
const verificaUserType = require('./routes/verificaUserType');
const auth = require('./routes/auth');
const addBooking = require('./routes/addBooking');
const prenotations = require('./routes/prenotations');
const suggEvents = require('./routes/suggEvents');
const addComments = require('./routes/addComment');
const getComments = require('./routes/getComment');
const addEvaluation = require('./routes/addEvaluation');
const getEvaluations = require('./routes/getEvaluations');
const addSuggEvent = require('./routes/addSuggEvent');
const convertEvent = require('./routes/convertEvent');
const addTag = require('./routes/addTag');
const tags = require('./routes/tags');
const deleteComment = require('./routes/deleteComment');

//connesione al database
let url;
if (process.env.DB_USERNAME && process.env.DB_PASSWORD) {
    url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.c9u75.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
} else {
    //TODO: rimuovere credenziali hardcoded
    url = `mongodb+srv://fraCok:fraCok@cluster0.c9u75.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
}
mongoose.connect(url);


const app = express();

// Crea una sessione (biscotti temporanei) parte 1
app.use(session({
    secret: crypto.randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
        secure: false //TODO: false per i test, True per quando il progetto e' finito
    }
}));
// biscotti parte 2
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const corsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/addUser',addUser);
app.use('/addEvent',addEvent);
app.use('/addFavorite',addFavorite);
app.use('/users',users);
app.use('/events',events);
app.use('/addBooking',addBooking);
app.use('/verificaUserType',verificaUserType);
app.use('/auth',auth);
app.use('/prenotations', prenotations);
app.use('/suggEvents', suggEvents);
app.use("/addComment", addComments);
app.use('/getComment',getComments);
app.use('/addEvaluation', addEvaluation);
app.use('/getEvaluation', getEvaluations);
app.use('/addSuggEvent', addSuggEvent);
app.use('/convertEvent', convertEvent);
app.use('/addTag', addTag);
app.use('/tags', tags);
app.use('/deleteComment', deleteComment);

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
