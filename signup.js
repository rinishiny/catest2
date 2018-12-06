var express = require('express');
var router = express.Router();
var sqlstring = require('sqlstring');
var mysql = require('mysql');
var formidable = require('formidable');
var fs = require('fs');


var con = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'welcome123'
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.get('/signup',function(req,res){

  con.query('use catest2',function(err,res){
    if(err) throw err;
    console.log(req.query.username);
    con.query('select * from reservation where name=?',req.query.username,function(error,results){
      if(error) throw error;
      else{
        console.log("results:",results);
        if(results.length > 0){
          console.log('Name already exists');
        }
        else{
          console.log("Connection Ok"); 
		  con.query('insert into reservation(name,address,phone,src,destn,class,pcount) values(?,?,?,?,?,?,?)',
		  [req.query.username,req.query.address,req.query.phone,req.query.src,req.query.destn, req.query.sclass, req.query.pcount],function(er,re){
            if(er) throw er;
            else{
              console.log("Signup success"); 
            }
          });
          
        }
      }
    })
  });
  res.render('index');
});


module.exports = router;