/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const {getUserWithEmail} = require('./dbhelperqueries')
const express = require('express');
const router  = express.Router();

const bcrypt = require('bcrypt')
module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        console.log("is error here")
        res
          .status(500)
          .json({ error: err.message });
      });
  });
/***********USER GET ROUTES ************/
router.get("/", (req, res) => {// include condition if logged in
  const templateVars = {
    userId: req.session["userId"],
    password: req.session["userId.password"]
  }; res.render("index", templateVars); // Home Page
});

router.get('/register', (req, res) => {
  const templateVars = {
    userId: req.session["userId"],
    password: req.session["userId.password"]
  };
  res.render('register.ejs', templateVars);
});

router.get("/login", (req, res) => {
  const templateVars = {
    userId: req.session["userId"],
    password: req.session["userId.password"]
  };
  res.render("login.ejs", templateVars);
});

  const login =  function(email, password) {
    return getUserWithEmail(email) ///helper function needed
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  }
// exports.login = login; // user this when transfer to users.js

router.post('/login', (req, res) => {
  // const {email, password} = req.body;
  const user = req.body;
  const email = req.body.email
  const password = req.body.password
console.log("user>>>>>>",user)

  login(user)
    .then(user => {
      console.log("user>>>>>>>>",user)
      if (!email) {
        res.send({error: "error"});
        return;
      }
      req.session.userId = user.id;
      // res.send({user: {name: user.name, email: user.email, id: user.id}});
    })
    .catch((err) => {

      console.log("error>>>>>>>",err)
      res.redirect("/login")

      res.send(err)});
});
/***********USER POST ROUTES ************/
  // Create a new user
  router.post('/register', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    db.addUser(user) ///helperFunction in dbhelperqueries
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
  router.get("/", (req, res) => {
    const userId = req.session['userId'];
    if (!userId) {
      res.send({message: "not logged in"});
      return;
    }
    db.getUserWithId(userId) // fetch with dbhelperqueries
      .then(user => {
        if (!user) {
          res.send({error: "no user with that id"});
          return;
        }

        res.send({user: {name: user.name, email: user.email, id: userId}});
      })
      .catch(err => res.send(err));
  });











  return router;
};
