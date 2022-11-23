const sum=(num1,num2)=> num1+num2;
// module.exports= sum;

const pi=3.14;
class SomeMathObject{
    constructor(){
        console.log("object created");
    }
}
const nege=(num1,num2)=> num1-num2;

// module.exports.sum=sum;
// module.exports.SomeMathObject=SomeMathObject;
// module.exports.pi=pi;
// module.exports.nege=nege;

module.exports={sum:sum,nege:nege,pi:pi,SomeMathObject:SomeMathObject};



app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.get('/registration',function(req,res){
      res.render('registration');
});


app.get('/',function(req,res){
    res.render('login');
});
app.get('/home',function(req,res){
    res.render('home');
});
app.post('/',function(req,res){

    var username=req.body.username;
    var password=req.body.password;
    MongoClient.connect('mongodb://127.0.0.1:27017',function(err,client){
        if(err)throw err;
        var db=client.db("ProjectDB");
        db.collection('FirstCollection').find().toArray(function(err,results){
            if(err)throw err;
        var flag=0; 
        // console.log(results);
        console.log("fisrtname "  +username);
        console.log("password  "+password);
        for (let index = 0; index < results.length; index++) {
            console.log(index);
            var element = JSON.stringify(results[index]);
            console.log(element+" "+index);
            var user=JSON.parse(element);
            if(user.username==username&&user.password==password)
                flag=1;
        }
        //  console.log(results);

         if(flag==1){
            console.log("true");
            res.redirect('/home');
         }else 
                res.end('invalide user name');
            });
    });

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
    // db.collection('FirstCollection').insertOne({username:"rameznashaat",password:"1234"});
    db.collection('FirstCollection').find().toArray(function(err,results){
        if(err)throw err;
    // console.log(results);
    });
});





