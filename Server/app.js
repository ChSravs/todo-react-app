var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/customers');
var productsRouter = require('./routes/products');
var deviceRouter = require('./routes/devices');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var db;
// -------- MongoDB operations----------------
mongoose.connect('mongodb://admin:Asdf!234@ds131551.mlab.com:31551/chsravya',{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.on('connected', () => {
    console.log('connected to Database');
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});
app.use(function(err,req,res,next){
  if (req.headers['origin']) {
    // log.debug(req.headers['origin']);
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', req.headers['origin']);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  }
})

app.use('/', indexRouter);
app.use('/customers',usersRouter);
app.use('/products', productsRouter);
app.use('/device', deviceRouter)

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