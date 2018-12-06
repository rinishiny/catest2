var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var regRouter = require('./routes/signup');
var cancelRouter = require('./routes/cancel');
var admnextRouter = require('./routes/admnext')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var mysql = require('mysql');
var sqlstring =require('sqlstring');
var con = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'welcome123'
});

con.query('use catest2',function(err,res){
  if(err) throw err;
  else
    console.log('Database connection succesful');
});



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', regRouter);
app.use('/cancel', cancelRouter);
app.use('/admnext', admnextRouter);


module.exports = app;