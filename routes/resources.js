/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const {
  getUser,
  commentsForResourceId,
  getAllContent,
  contentView,
  addFavourite,
  addComment,
  addRating,
  addResource,
  updateUser,
  myResources,
} = require("../db/database_functions/database");

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //Filter for food
  router.get("/", (req, res) => {
    console.log(getAllContent());
    getAllContent(req.query)
      .then((resources) => {
        res.render("index", { resources });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

//gets specific comments
  router.get("/:id/comments", (req, res) => {
    const { id } = req.params;
    commentsForResourceId(id).then((rows) => {
      res.json(rows);
    });
  });

  router.post("/:id/comments", (req, res) => {
    const { id: resource_id } = req.params;
    const user_id = 1;
    const comment = req.body.comment;
    console.log("req.body>>>", req.body);
    console.log("comment>>>>", comment);
    const result = addComment({ comment, resource_id, user_id });
    result.then((createdComment) => {
      console.log("created comment", createdComment);
      res.send(createdComment);
    });
  });

  router.get("/new_content", (req, res) => {
    res.render("new_content"); // ,templateVars;
  });

  router.post("/new_content", (req, res) => {
    addResource(req.body).then((resource) => {
      res.redirect("/api/users");
    });
  });

  // post for adding a rating to a resource_DSM
  router.post("/:id/rating", (req, res) => {
    const id = req.params.id;
    const selectedRating = req.body.selectedRating;

    addRating({ rating: selectedRating, resource_id: id });
  });

  //***** individual view of a specific resource
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    contentView(id).then((resource) => {
      const templateVars = {
        resource: resource,
      };
      res.render("ind_view.ejs", templateVars);
    });
  });
  //get all resources made by adn liked by a specific user
  router.get("/:id/myresources", (req, res) => {
    const user_id = req.params.id;
    myResources(user_id).then((resources) => {
      const templateVars = {
        resources: resources,
      };
      res.render("index.ejs", templateVars);
    });
  });

  return router;
};
