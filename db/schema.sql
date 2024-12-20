DROP DATABASE IF EXISTS movie_db;
CREATE DATABASE movie_db;

\c movie_db;

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  movie_name VARCHAR(40)
);


CREATE TABLE reviews (
  id INTEGER PRIMARY KEY,
  movie_id INTEGER, 
  reviews TEXT,
  FOREIGN KEY (movie_id)
  REFERENCES movies(id)
  ON DELETE CASCADE
  );
