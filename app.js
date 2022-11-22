var express = require('express');
var path=require('path')
var app = express();
var fs=require('fs');
const PORT = 3000;
app.set('views',path.join(__dirname ,'views'));
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
    res.render('login');
});



app.post('/login',function(req,res){
//TODO 
});

var x = {name:"mohamed",age:27,username:"ali92",password:"abc123"};
var s = JSON.stringify(x);
fs.writeFileSync("users.json",s);

var data=fs.readFileSync("users.json");
var ob=JSON.parse(data);

var MongoClient=require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017',function(err,client){
    if(err)throw err;
    var db=client.db("ProjectDB");
     // db.collection('FirstCollection').insertOne({id:85,firstName:'ramez',lastName:'rtrt'});



    db.collection('FirstCollection').find().toArray(function(err,results){
        if(err)throw err;
    // console.log(results);
    });



});

if(process.env.PORT){
    app.listen(process.env.PORT,function(){console.log("server started")});
}else
app.listen(3000,function(){console.log("server started on port 3000")});






// app.listen(3000);

// console.log(ob);
// console.log(s);