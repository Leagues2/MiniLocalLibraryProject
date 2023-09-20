const createError = require('http-errors');
require('dotenv').config()
const express = require('express');
//mongoose connection:
const mongoose = require('mongoose')
mongoose.set("strictQuery" , false)
const mongoDB = process.env.DB_URI

main().catch((error)=>
  console.log(error)
)
async function main() {
  await mongoose.connect(mongoDB)
}


const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog')
const compression = require("compression");
const helmet = require("helmet");
const { error } = require('console');

const app = express();

const RateLimit = require("express-rate-limit")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const limiter = RateLimit({
  windowMs : 1 * 60 * 1000 ,// 1 min per 20 reqs
  max : 20 * 3
})
app.use(limiter)
app.use(helmet.contentSecurityPolicy({
  directives : {
    "script-src" : ["'self'", "code.jquery.com", "cdn.jsdelivr.net"]
  }
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/' , indexRouter)
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);


// catch 404 and forward to error handler
app.use(function(req, res) {
  return res.end("404 Not Found");
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

