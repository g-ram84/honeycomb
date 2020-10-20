const { Pool } = require('pg');
const { query } = require('express');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

// LOGIN PAGE FUNCTIONS

// Look up user

const getUser = function(user) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE email = $1
  `, user)
  .then(res => res.rows[0]);
}
<<<<<<< HEAD
=======

>>>>>>> 204598b61144b6aec0de4c158c25e69353462c63

//LANDING PAGE FUNCTIONS

const getCategories = function(categories) {
  return pool.query(`
  SELECT resources.title, resources.url, resources.description, category
  FROM categories
  JOIN resources ON resources.id = resource_id
  WHERE category = $1
  `, categories)
  .then(res => res.rows[0]);
}
exports.getCategories = getCategories;
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

const addFavourite = function(favourites) {
  return pool.query(`
  INSERT INTO favourites (user_id, resource_id, favourite)
  VALUES ($1, $2, TRUE)
  RETURNING *
`, [favourites.user_id, favourites.resource_id, favourites.favourite])
  .then(res => res.rows[0]);
}
exports.addFavourite = addFavourite;

//Add comment to resource

const addComment = function(comments) {
  return pool.query(`
  INSERT INTO comments (comment, resource_id, user_id)
  VALUES ($1, $2, $3)
  RETURNING *
  `, [comments.comment, comments.resource_id, comments.user_id])
  .then(res => res.rows[0]);
}
exports.addComment = addComment;

// Add rating to resource
const addRating = function(resource_ratings) {
  return pool.query(`
  INSERT INTO resource_ratings (rating, resource_id, user_id)
  VALUES ($1, $2, $3)
  RETURNING *
  `,[resource_ratings.rating, resource_ratings.resource_id, resource_ratings.user_id])
  .then(res => res.rows[0]);
}
exports.addRating = addRating;

// NEW CONTENT PAGE

// Add new content
const addResource = function(resources){
  return pool.query(`
  INSERT INTO resources (url, user_id, title, description, date_created, media_type)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *
  `, [resources.url, resources.user_id, resources.title, resources.description, resources.date_created, resources.media_type])
  .then(res => res.rows[0]);
}
exports.addResource = addResource;

// EDIT USER PAGE

// Update user info

const updateUser = function(users) {
  return pool.query(`
  UPDATE users
  SET user_name = $1, profile_picture_url = $2
  WHERE users.id = $3
  `, users)
  .then(res => res.rows[0]);
}

exports.updateUser = updateUser;

// Search function

const searchResources = function(search) {
  const queryParams = [];
  let queryString = `
  SELECT url, resources.id, title, AVG(resource_ratings.rating) as average_rating, comments.comment, resources.date_created
  FROM resources
  JOIN resource_ratings ON resource_ratings.resource_id = resource_id
  WHERE 1=1
  `;
  if(search.description) {
    queryParams.push(`%${resources.description}%`);
    queryString += `AND description LIKE $${queryParams.length} `;
  }
  queryString += `
  ORDER BY resources.date_created
  `;
  return pool.query(queryString, queryParams)
  .then(res => res.rows);
};
  exports.searchResources = searchResources;
