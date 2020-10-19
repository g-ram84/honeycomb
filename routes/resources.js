/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

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


  router.get("/resources/new", (req, res) => { //backend request
    const userId = req.session['userId']; //Figure out userId
    if (userDatabase[userId]) {
      const templateVars = {
        userId
      };
      res.render("resources_new", templateVars);
    } else {
      res.redirect('/login');
    }
    res.render("new_content.ejs"); //name of ejs i want to render
  });


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

