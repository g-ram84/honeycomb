const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
const { query } = require('express');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

//LANDING PAGE FUNCTIONS

//Create a function that displays content along with user_name, date_created, title, description, url

const getAllContent = function() {
  return pool.query(`
  SELECT users.user_name, date_created, title, description, url
  FROM resources
  JOIN users ON users.id = user_id
`)
  .then(res => res.rows);
}
exports.getAllContent = getAllContent;


//INDIVIDUAL RESOURCE VIEW

//Create a function that shows content (url), title, rating, comments
const contentView = function(id) {
  return pool.query(`
  SELECT url, resources.id, title, AVG(resource_ratings.rating) as average_rating, comments.comment, resources.date_created
  FROM resources
  JOIN resource_ratings ON resource_ratings.user_id = resources.user_id
  JOIN comments ON comments.resource_id = resources.id
  WHERE resources.id = $1
  GROUP BY resources.url, resources.id, comments.comment
 `, id)
  .then(res => res.rows);
}
exports.contentView = contentView;

//Create a function that allows the user to add a favourite

const addFavourite = function(user, resource) {
  return pool.query(`
  UPDATE favourites
  SET favourite = TRUE
  FROM resources
  INNER JOIN users ON users.id = resources.user_id
  WHERE users.id = $1 AND resources.id = $2
`, user, resource)
  .then(res => res.rows[0]);
}
exports.addFavourite = addFavourite;

//Add comment to database

const addComment = function(comment, resource, user) {
  return pool.query(`
  INSERT INTO comments
  SET comment = $1
  WHERE users.id = $3 AND resources.id = $2
  `, comment, resource, user)
  .then(res => res.rows[0]);
}
exports.addComment = addComment;


// UPDATE favourites
// SET favourite = TRUE
// JOIN resources ON resources.id = favourites.resource_id
// JOIN users ON users.id = favourites.user_id
// WHERE users.id = '1' AND resources.id = '1'
