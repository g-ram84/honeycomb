/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const {getUser,getAllContent,contentView,addFavourite,addComment,addRating,addResource,updateUser} = require('../db/database_functions/database')

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    let query = `SELECT * FROM resources`;
    console.log(query);
    db.query(query)
      .then(data => {
        const resources = data.rows;
        res.json({ resources });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.get("/new_content", (req, res) => { //backend request
    const userId = req.session['userId']; //Figure out userId

    if (userDatabase[userId]) { //query here
      //contentView(userId)

      const templateVars = {
        userId



      };
      res.render("new_content", templateVars);
    } else {
      res.redirect('/login');
    }
    res.render("new_content.ejs"); //name of ejs i want to render
  });


  // router.post('/', (req, res) => {
  //   addResource({resource})// what am i defining as resource// an object from
  //     .then(resource => {
  //       res.send(resource);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       res.send(err)
  //     });
  // });

//***** YOUR CREATED resource PAGE *****
router.get("/ind_view", (req, res) => {

  let { resource } = req.params;
  const templateVars = {
    userId: req.session["userId"],
    resource: resource,
  };
  res.render("ind_view.ejs", templateVars);
});






  return router;
};

