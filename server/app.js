var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var expressSession = require('express-session')
const cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
const fs = require('fs');

var app = express();

app.use(expressSession({ secret: 'samurai cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

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

var GOOGLE_CLIENT_ID = fs.readFileSync('c:/_/shared-activities-app/google-client-id.txt', 'ascii');
var GOOGLE_CLIENT_SECRET = fs.readFileSync('c:/_/shared-activities-app/google-client-secret.txt', 'ascii');

passport.use(
  new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      console.group('GoogleStrategyFunction')
      done(null, profile)
      console.log('done called')
      console.groupEnd()
    }
  )
);

passport.serializeUser(function(user, done) {
  // this is called during done() from GoogleStrategyFunction
  console.group('serializeUser')
  console.log('###', user)
  done(null, user.id);
  console.log('done called')
  console.groupEnd()
});

passport.deserializeUser(function(id, done) {
  console.group('deserializeUser')
  console.log('!!!', id)
  done(null, {id, name: 'banana fantana'})
  console.log('done called')
  console.groupEnd()
});

module.exports = app;