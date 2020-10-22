/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const dbHelper = require ('../db/database_functions/database')

const { getUserWithEmail, addUser } = require('./dbhelperqueries');
// const {getUser,getAllContent,contentView,addFavourite,addComment,addRating,addResource,updateUser} = require('../db/database_functions/database')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  // router.get("/", (req, res) => {
  //   db.query(`SELECT * FROM users;`)
  //     .then(data => {
  //       const users = data.rows;
  //       res.json({ users });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
  /***********USER GET ROUTES ************/

//   router.get("/", (req, res) => {// include condition if logged in
//     const templateVars = {
//       userId: req.session["userId"],
//       password: req.session["userId.password"]
//     };
// res.render("index");
//       // Home Page
  // });
  router.get("/", (req, res) => {

      dbHelper.getAllContent()
      .then(data => {
        const templateVars = {
          resources: data
        };
      //  console.log(data);
       res.render("index.ejs",templateVars);
    })
    // .then(data => {


    // })
  });

  router.post("/", (req, res) => {

    console.log(`req body: ${JSON.stringify(req.body)}`)
    // let options = req.body
          dbHelper.getAllContent()
          .then(data => {
            const templateVars = {
              resources: data
            };
            console.log(`res: ${data}`)
           return data
          //  res.render("index.ejs",templateVars);
        })
        // .then(data => {


        // })
      });

//restart server
  router.get("/", (req, res) => {
          dbHelper.getAllContent()
          .then(data => {
            const templateVars = {
              resources: data
            };

           res.render("index.ejs",templateVars);
        })
          .catch(e => {
            console.log('e>>>>', e)
          })
        // .then(data => {


        // })
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

  const login = function (email, password) {

    return getUserWithEmail(email) ///helper function needed
      .then(user => {
        console.log("password>>>>>",password)
        console.log("user.password>>>>>",user.password)

        if (bcrypt.compareSync(password, user.password)) {
          return user;
        }
        return null;
      });
  };
  // exports.login = login; // user this when transfer to users.js

  router.post('/login', (req, res) => {
    const {email, password} = req.body;


    login(email, password)
      .then(user => {
        console.log("userinloginpromise", user);
        if (!email) {
          res.send({ error: "error" });
          return;
        }
        req.session.userId = user.id;
        // res.send({user: {name: user.name, email: user.email, id: user.id}});
      })
      .catch((err) => {
        console.log("errorlogin", err);
        res.redirect("/login");

        res.send(err);
      });
  });
  /***********USER POST ROUTES ************/
  // Create a new user
  router.post('/register', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    addUser(user) ///helperFunction in dbhelperqueries
      .then(user => {
        if (!user) {
          res.send({ error: "error" });
          return;
        }
        console.log("register user>>>", user)

        req.session.userId = user.id;
        res.send("🤗");
      })
      .catch(err => res.send(err));
  });

  router.get("/", (req, res) => {
    const userId = req.session['userId'];
    if (!userId) {
      res.send({ message: "not logged in" });
      return;
    }
    db.getUserWithEmail(userId) // fetch with dbhelperqueries
      .then(user => {
        if (!user) {
          res.send({ error: "no user with that id" });
          return;
        }

        res.send({ user: { name: user.name, email: user.email, id: userId } });
      })
      .catch(err => res.send(err));
  });











  return router;
};


// app.get("/register", (req, res) => {
//   if (req.session.id) {
//     res.redirect("/");
//   } else {
//     const templateVars = { username: req.session.id, user:null };
//     res.render("register", templateVars);
//   }
// });










