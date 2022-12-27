var express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
var path = require("path");
var fs = require("fs");
var alert = require("alert");
const PORT = process.env.PORT || 3030;

const dest = ["santorini", "bali", "rome", "paris", "inca", "annapurna"];
const destNames = [
  "santorini island",
  "bali island",
  "rome",
  "paris",
  "inca trail to machu picchu",
  "annapurna circuit",
];

var app = express();
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

  if (session.userid) {
    res.redirect("/home");
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
  if(session.userid)
  res.render("wanttogo", { list: session["wanttogo"] });
  else res.redirect("/");
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
  session["wanttogo"].push(dest);
}

app.post("/wanttogo-annapurna", function (req, res) {
  res.redirect("/annapurna");
  addDestinationToDB("annapurna");
});

app.post("/", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (username == "admin" && password == "admin") {
    session = req.session;
    session.userid = req.body.username;
    session["wanttogo"] = [];
    res.redirect("home");
  } else {
    alert("invalid credentials");
    res.render("login", { error: "" });
  }
});

app.post("/register", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (username == "admin" && password == "admin") {
    res.redirect("/");
    alert("registered successfully");
  } else {
    alert("please choose a username and password");
    res.render("registration");
    return;
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
app.listen(5000);
