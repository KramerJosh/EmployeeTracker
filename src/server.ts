import express from "express";
import { QueryResult } from "pg";
import { pool, connectToDb } from "./connection.js";

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Hardcoded query: DELETE FROM course_names WHERE id = 3; //the $1 refers to the first object in the array in the second arg
app.delete("/api/movie/:id", (req, res) => {
  const delMovie = req.params.id;
  pool.query(`DELETE FROM movies WHERE id = $1`, [delMovie], (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${result} row(s) deleted!`);
      // console.log(`movie: ${res}`)
      res.send("deleted")
      return;
    }
  })
});


//this should be updated for get all
app.get("/api/movies", (_req, res) => {
  //query the database
  pool.query(
    `SELECT * FROM movies`,
    (err: Error, result: QueryResult) => {
      if (err) {
        console.log(err);
      } else if (result) {
        console.log(result.rows);
        res.send(result.rows);
      }
    }
  );
});


//this should be updated for get 1
app.get("/api/movies/:id", (req, res) => {
  //query the database
  const id = parseInt(req.params.id);
  pool.query(
    `SELECT * FROM movies where ID = $1`,
    [id],
    (err: Error, result: QueryResult) => {
      if (err) {
        console.log(err);
      } else if (result) {
        console.log(result.rows);
        res.send(result.rows);
      }
    }
  );
});



//this should be updated for get 1
app.post("/api/add-movie/", (req, res) => {
  //query the database
  const newMovie = req.body.movie_name;
  pool.query(
    `INSERT INTO movies (movie_name) values ($1)`,[newMovie],
    (err: Error, result: QueryResult) => {
      if (err) {
        console.log(err);
        res.send("error")
      } else if (result) {
        // console.log(result);
        res.send("OK");
      }
    }
  );
});



// Default response for any other request (Not Found)
app.use((_req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
