// server side requests


// load .env data into process.env
// require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const cookieSession = require('cookie-session');


// PG database client/connection setup
// const { Pool } = require('pg');
// const dbParams = require('./lib/db.js');
// const db = new Pool(dbParams);
// db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
// app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use(cookieSession({
  name: 'session',
  keys: ['secretkey1', 'secretkey2'],
  maxAge: 24 * 60 * 60 * 1000
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const resourcesRoutes = require("./routes/resources");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/resources", resourcesRoutes(db));

// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file! =====================Job For Later
// Separate them into separate routes files (see above).

<<<<<<< HEAD
/***********RESOURCE GET ROUTES ************/


app.get("/", (req, res) => { //backend request
  res.render("/index"); //name of ejs i want to render
});

=======

/***********USER GET ROUTES ************/
app.get("/", (req, res) => {// include condition if logged in
  const templateVars = {
    userId: req.session["userId"],
    password: req.session["userId.password"]
  }; res.render("index", templateVars); // Home Page
});

app.get('/register', (req, res) => {
  const templateVars = {
    userId: req.session["userId"],
    password: req.session["userId.password"]
  };
  res.render('register.ejs', templateVars);
});

app.get("/login", (req, res) => {
  const templateVars = {
    userId: req.session["userId"],
    password: req.session["userId.password"]
  };
  res.render("login.ejs", templateVars);
});



/***********RESOURCE GET ROUTES ************/


app.get("/myResources/", (req, res) => { //backend request
  res.render("myResources.ejs"); //name of ejs i want to render
});

app.get("/resources/new", (req, res) => { //backend request
  const userId = req.session['userId']; //Figure out userId
  if (userDatabase[userId]) {
    const templateVars = {
      userId
    };
    res.render("resources_new", templateVars);
  } else {
    res.redirect('/login');
  }
  res.render("resources_new.ejs"); //name of ejs i want to render
});
//***** YOUR CREATED resource PAGE *****
app.get("/myResources/:resource", (req, res) => {
  let { resource } = req.params;
  const templateVars = {
    userId: req.session["userId"],
    resource: resource,
  };
  res.render("created_resource.ejs", templateVars);
});


>>>>>>> 204598b61144b6aec0de4c158c25e69353462c63
//*****POST LOGOUT*****
app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});


<<<<<<< HEAD
=======
/***********USER POST ROUTES ************/
  // Create a new user
  app.post('/register', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    database.addUser(user) ///helperFunction in dbhelperqueries
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userId = user.id;
      res.send("🤗");
    })
    .catch(err => res.send(err));
  });


const login =  function(email, password) {
  return database.getUserWithEmail(email) ///helper function needed
  .then(user => {
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  });
}
// exports.login = login; // user this when transfer to users.js

app.post('/login', (req, res) => {
  const {email, password} = req.body;
  login(email, password)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userId = user.id;
      res.send({user: {name: user.name, email: user.email, id: user.id}});
    })
    .catch(err => res.send(err));
});

// when click on myResources
app.get("/myResources", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.send({message: "not logged in"});
    return;
  }
  database.getUserWithId(userId) // fetch with dbhelperqueries
    .then(user => {
      if (!user) {
        res.send({error: "no user with that id"});
        return;
      }

      res.send({user: {name: user.name, email: user.email, id: userId}});
    })
    .catch(err => res.send(err));
});



>>>>>>> 204598b61144b6aec0de4c158c25e69353462c63
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
