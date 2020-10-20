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
<<<<<<< HEAD:routes/widgets.js
    let query = `SELECT url, resources.id, title, AVG(resource_ratings.rating) as average_rating, comments.comment, resources.date_created
    FROM resources
    JOIN resource_ratings ON resource_ratings.user_id = resources.user_id
    JOIN comments ON comments.resource_id = resources.id
    WHERE resources.id = 1
    GROUP BY resources.url, resources.id, comments.comment`;
=======
    let query = `SELECT * FROM resources`;
>>>>>>> cf4d1a328fa4b536a5334e5e692791506d9aeb4a:routes/resources.js
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
  return router;
};

