var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var usersRouter = require('./routes/users');

var messageRoute = require("./routes/postMessageRoute")
var cors = require('cors');
var app = express();
const mongoose = require('mongoose');

//var usage       = require('usage');

mongoose.connect("mongodb+srv://sharad:sharad123@sharad-wezb2.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true ,  useUnifiedTopology: true });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/users', usersRouter);
app.use("/message", messageRoute)

var userService = require("./services/userService");

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

CHECK_CPU_USAGE_INTERVAL    = 1000*5; // every minute
HIGH_CPU_USAGE_LIMIT        = 70; // percentage

// autoRestart = setInterval(function()
// {
//   usage.lookup(process.pid, function(err, result)
//   {
//     if(!err)
//     {
//       if(result.cpu > HIGH_CPU_USAGE_LIMIT)
//       {
//         // log
//         console.log('restart due to high cpu usage');
//
//         // restart because forever will respawn your process
//         process.exit();
//       }
//     }
//   });
// }, CHECK_CPU_USAGE_INTERVAL);
//
// autoRestart()
module.exports = app;
