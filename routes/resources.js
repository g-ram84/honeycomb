/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const { getUser, commentsForResourceId, getAllContent, contentView, addFavourite, addComment, addRating, addResource, updateUser } = require('../db/database_functions/database');

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
    console.log("im in router get /");
    console.log(getAllContent());
    getAllContent(req.query)
      .then(resources => {
        res.render('index', { resources });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/:id/comments", (req, res) => {
    const { id } = req.params;

    commentsForResourceId(id)
      .then((rows) => {
        res.json(rows);
      }

      );

  });

  router.post("/:id/comments", (req, res) => {
    console.log("req.body>>>",req.body)
    const { comments, resource_id, user_id}  = req.body

    addComment(req.body)

res.send("ok")
  });


 // post requestresources/id/comments save the correct comment with that add Comment function respond res.send ok
  // on front end container empty rerun get comments ajax request to get comments and for loop to populate again
  //   with resource id
  // const addCommentToPage = () => {
  //   $("#submit-button").click(function () {
  //     console.log("onCLICK");
  //     renderComments();
  //   });


  router.get("/new_content", (req, res) => {
    res.render("new_content");// ,templateVars;
  });


  router.post('/:id', (req, res) => { // currently not working

    const { id } = req.params;
    contentView(id);
    console.log('post :id comment>>>>',comment)
    const { comment } = req.body
      .then(comment => {
        res.send('ind_view', comment);
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

