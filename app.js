const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;

// var express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
var path = require("path");
var fs = require("fs");
var alert = require("alert");
const { ObjectID } = require("mongodb");
const dest = ["santorini", "bali", "rome", "paris", "inca", "annapurna"];
const destNames = [
  "santorini island",
  "bali island",
  "rome",
  "paris",
  "inca trail to machu picchu",
  "annapurna circuit",
];

// var app = express();
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
var session;

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
app.get("/", function (req, res) {
  session = req.session;
  console.log(session.userid);
  if (session.userid) {
    res.redirect("home");
  } else res.render("login", { error: "" });
});

app.get("/home", function (req, res) {
  session = req.session;
  if (session.userid) {
    res.render("home");
  } else res.redirect("/");
});

app.get("/registration", function (req, res) {
  res.render("registration");
});

app.get("/cities", function (req, res) {
  session = req.session;
  if (session.userid) res.render("cities");
  else res.redirect("/");
});
app.get("/bali", function (req, res) {
  session = req.session;
  if (session.userid) res.render("bali");
  else res.redirect("/");
});
app.get("/santorini", function (req, res) {
  session = req.session;
  if (session.userid) res.render("santorini");
  else res.redirect("/");
});
app.get("/paris", function (req, res) {
  session = req.session;
  if (session.userid) res.render("paris");
  else res.redirect("/");
});
app.get("/hiking", function (req, res) {
  session = req.session;
  if (session.userid) res.render("hiking");
  else res.redirect("/");
});
app.get("/inca", function (req, res) {
  session = req.session;
  if (session.userid) res.render("inca");
  else res.redirect("/");
});
app.get("/annapurna", function (req, res) {
  session = req.session;
  if (session.userid) res.render("annapurna");
  else res.redirect("/");
});

app.post("/search", function (req, res) {
  var ser = req.body.Search;
  ser = ser.toLowerCase();
  var b = [];
  for (var i = 0; i < destNames.length; i++) {
    if (destNames[i].includes(ser)) b.push(dest[i]);
  }

  res.render("searchresults", { destinations: b });
  if (b.length == 0) alert("destination not found");
});
app.get("/rome", function (req, res) {
  session = req.session;
  if (session.userid) res.render("rome");
  else res.redirect("/");
});

app.get("/islands", function (req, res) {
  session = req.session;
  if (session.userid) res.render("islands");
  else res.redirect("/");
});
app.get("/wanttogo", function (req, res) {
  session = req.session;
  if (session.userid) {
    MongoClient.connect(URI, function (err, client) {
      if (err) throw err;
      var db = client.db("myDB");
      db.collection("myCollection").findOne(
        { username: session.userid },
        (err, result) => {
          res.render("wanttogo", { list: result.wantToGo });
          console.log(result);
        }
      );
    });
  } else res.redirect("/");
});

app.post("/paris", function (req, res) {
  res.redirect("/paris");
  addDestinationToDB("paris");
});

app.post("/wanttogo-bali", function (req, res) {
  res.redirect("/bali");
  addDestinationToDB("bali");
});

app.post("/wanttogo-rome", function (req, res) {
  res.redirect("rome");
  addDestinationToDB("rome");
});

app.post("/wanttogo-santorini", function (req, res) {
  res.redirect("/santorini");
  addDestinationToDB("santorini");
});

app.post("/wanttogo-inca", function (req, res) {
  res.redirect("/inca");
  addDestinationToDB("inca");
});

function addDestinationToDB(dest) {
  MongoClient.connect(URI, function (err, client) {
    if (err) throw err;
    var db = client.db("myDB");

    db.collection("myCollection")
      .find()
      .toArray(function (err, result) {
        for (i = 0; i < result.length; i++) {
          var str = JSON.stringify(result[i]);
          var user = JSON.parse(str);
          if (user.username == session.userid) {
            var list = JSON.parse(JSON.stringify(user.wantToGo));
            console.log(list);
            if (!list.includes(dest)) {
              list.push(dest);
            } else alert("you already added this destination before");

            console.log(list);

            db.collection("myCollection").updateOne(
              { username: user.username },
              {
                $set: {
                  wantToGo: list,
                },
              }
            );
          }
        }
      });
  });
}

app.post("/wanttogo-annapurna", function (req, res) {
  res.redirect("/annapurna");
  addDestinationToDB("annapurna");
});
var MongoClient = require("mongodb").MongoClient;
const URI = "mongodb://127.0.0.1:27017";

app.post("/", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  MongoClient.connect(URI, function (err, client) {
    if (err) throw err;
    var db = client.db("myDB");
    var flag = 0;
    if (user.username == "admin" && user.password == "admin") flag = 1;
    db.collection("myCollection")
      .find()
      .toArray(function (err, result) {
        for (i = 0; i < result.length; i++) {
          var str = JSON.stringify(result[i]);
          var user = JSON.parse(str);
          if (user.username == username && user.password == password) flag = 1;
        }
        if (flag == 1) {
          session = req.session;
          session.userid = req.body.username;
          res.redirect("home");
        } else {
          alert("invalid credentials");
          res.render("login", { error: "" });
        }
      });
  });
});

app.post("/register", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log(username);
  console.log(password);
  if (!username || !password || username == "" || password == "") {
    alert("please choose a username and password");
    res.render("registration");
    return;
  }

  MongoClient.connect(URI, function (err, client) {
    if (err) throw err;
    var db = client.db("myDB");

    db.collection("myCollection")
      .find()
      .toArray(function (err, result) {
        var flag = 0;
        for (i = 0; i < result.length; i++) {
          var str = JSON.stringify(result[i]);
          var user = JSON.parse(str);
          if (user.username == username) flag = 1;
        }
        if (flag == 1) {
          res.render("registration");
          alert("this username is already taken");
          return;
        } else {
          db.collection("myCollection").insertOne({
            username: username,
            password: password,
            wantToGo: [],
          });
          res.redirect("/");
          alert("registered successfully");
        }
      });
  });
});

app.listen(5000);
