var express = require('express');
var path = require('path');
var fs = require('fs');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
  res.render('login');
});

app.get('/home',function(req,res){
res.render('home');
});

app.get('/registration',function(req,res){
    res.render('resgistration');
});

app.get('/cities',function(req,res){
    res.render('cities');
});
app.get('/islands',function(req,res){
    res.render('islands');
});
app.get('/wanttogo',function(req,res){
    res.render('wanttogo');
});

////////////////////////////
app.post('/',function(req,res){
   var username=req.body.username;
   var password=req.body.password;
  console.log(username);
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect("mongodb://127.0.0.1:27017",function(err,client){
  if(err) throw err;
  var db = client.db('ProjectDB');
  db.collection('users').find().toArray(function(err,result){
    var flag=0; 
    for (i = 0; i < result.length; i++) {
        var str=JSON.stringify(result[i]);
        var user=JSON.parse(str);
        if(user.username==username&&user.password==password)
        flag=1; 
     }
     if(flag==1)
        res.redirect('home');
    });
  
 
});
});
//////////////

{/* <form method="POST">
Username:<br>
<input type="text" name="username">
<br>
Password:<br>
<input type="password" name="password">
<br><br>
<input type="submit" value="Login"> */}

// var MongoClient = require('mongodb').MongoClient;
// MongoClient.connect("mongodb://127.0.0.1:27017",function(err,client){
//   if(err) throw err;
//   var db = client.db('ProjectDB');
//   db.collection('users').insertOne({username:"ramez",password:"1234"});
// });
app.listen(3000);
