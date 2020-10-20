

// const properties = require('./json/properties.json');
// const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool.query(`SELECT *
 FROM users
 WHERE users.email = $1;`,
    [email])
    .then(res =>
      res.rows[0]);
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (email) {
  return pool.query(`SELECT *
    FROM users
    WHERE users.email = $1;`,
    [email])
    .then(res =>
      res.rows[0]);
};

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *`,
    [user.name, user.email, user.password])
    .then(res =>
      res.rows);
};

exports.addUser = addUser;

// /// Reservations

// /**
//  * Get all reservations for a single user.
//  * @param {string} guest_id The id of the user.
//  * @return {Promise<[{}]>} A promise to the reservations.
//  */
// const getAllReservations = function (guest_id, limit = 30) {
//   return pool.query(
//     `SELECT properties.*, reservations.*, AVG(property_reviews.rating)
//     FROM reservations
//     JOIN properties ON property_id = properties.id
//     JOIN property_reviews ON properties.id = property_reviews.property_id
//     WHERE reservations.guest_id = $1 AND reservations.end_date < now()::date
//     GROUP BY reservations.id, properties.id
//     ORDER BY reservations.start_date
//     LIMIT $2

//     `, [guest_id, limit])
//     .then(res => res.rows);
// };

// exports.getAllReservations = getAllReservations;

// /// Properties

// /**
//  * Get all properties.
//  * @param {{}} options An object containing query options.
//  * @param {*} limit The number of results to return.
//  * @return {Promise<[{}]>}  A promise to the properties.
//  */
// // object to hold them all =
// // {
// //   city,
// //   owner_id,
// //   minimum_price_per_night,
// //   maximum_price_per_night,
// //   minimum_rating
// // }


// const getAllProperties = function (options, limit = 10) {
//   const queryParams = [];
//   let queryString = `SELECT properties.*, AVG(property_reviews.rating)
//   FROM properties
//   JOIN property_reviews ON properties.id = property_reviews.property_id `;

//   //3
//   if (options.city) {
//     queryParams.push(`%${options.city}%`);
//     queryString += `WHERE city LIKE $${queryParams.length} `;
//   }
// if (options.owner_id) {

//   queryParams.push(`%${options.city}%`);
//   queryString += `properties.owner_id = $${queryParams.length};`
//   return pool.query(queryString, queryParams)
//       .then(res => res.rows)

// }


//   // 4
//   queryParams.push(limit);
//   queryString += `
//   GROUP BY properties.id
//   ORDER BY cost_per_night
//   LIMIT $${queryParams.length};
//   `;
//   //5
//   console.log(queryString, queryParams);
//   //6
//   return pool.query(queryString, queryParams)
//     .then(res => res.rows);
// };

// exports.getAllProperties = getAllProperties;


// /**
//  * Add a property to the database
//  * @param {{}} property An object containing all of the property details.
//  * @return {Promise<{}>} A promise to the property.
//  */
// const addProperty = function (property) {
//   const propertyId = Object.keys(properties).length + 1;
//   property.id = propertyId;
//   properties[propertyId] = property;
//   return Promise.resolve(property);
// };
// exports.addProperty = addProperty;
