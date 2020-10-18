DROP TABLE IF EXISTS resource_ratings;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS favourites;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS resources;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  profile_picture_url VARCHAR(255),
  password VARCHAR(255) NOT NULL
);

CREATE TABLE resources (
  id SERIAL PRIMARY KEY NOT NULL,
  url VARCHAR(255),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  description TEXT,
  media_type VARCHAR(10)
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE,
  category VARCHAR(25)
);

CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE,
  favourite BOOLEAN
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE,
  date_created DATE,
  comment VARCHAR(140)
);

CREATE TABLE resource_ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE,
  rating VARCHAR(1)
);
