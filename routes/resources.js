/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const { getUser, getAllContent, contentView, addFavourite, addComment, addRating, addResource, updateUser } = require('../db/database_functions/database');

const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // router.get("/", (req, res) => {
  //   let query = `SELECT * FROM resources`;
  //   console.log(query);
  //   db.query(query)
  //     .then(data => {
  //       const resources = data.rows;
  //       res.json({ resources });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  //Filter for food
  router.get("/", (req, res) => {
    getAllContent(req.query)
      .then(resources => {
        console.log("resources>>>", resources);
        res.render('index', { resources });
        // res.json({ resources });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.get("/new_content", (req, res) => {
    res.render("new_content");// ,templateVars;
  });


  router.post('/new_content', (req, res) => {
    addResource(req.body)
    .then(resource => {
      res.redirect('/')
    })
  })

// post for adding a rating to a resource_DSM
router.post('/:resource_id/ratings', (req, res) => {
  const resource_Id = req.params;
  //grab resource id from params
  //grab rating from body (name is "rating")
  //grab user id from params
  // db insert of resource_id, rating, user_id
  //res.send results

  console.log("rating prams: ", resourceId);


})







  router.post('/:id', (req, res) => {

    const { id } = req.params;
    const comment = req.body
      .then(comment => {
        res.send(comment);
      })
      .catch(err => {
        console.error(err);
        res.send(err);
      });
  });

  //***** YOUR CREATED resource PAGE *****
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    contentView(id)// replace with addComment then use the response to append the the front end if i want to save in database
      .then(resource => {
        const templateVars = {
          resource: resource,

        };
        res.render("ind_view.ejs", templateVars);
      });
  });


  return router;
};

