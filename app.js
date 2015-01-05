var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');

var app = module.exports = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser('qrcandy'));

app.use(session({
  store: new RedisStore({
    host: "127.0.0.1",
    port: 6379,
    db: "session"
  }),
  resave:false,
  saveUninitialized:false,
  secret: 'qrcandy'
}))

// app.use('/', routes);
// app.use('/users', users);

require('./routes/index')(app);
require('./routes/user')(app);
require('./routes/qrcode')(app);
require('./routes/register')(app);
require('./routes/login')(app);

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

