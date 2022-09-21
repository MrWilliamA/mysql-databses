const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "162.241.216.119",
  user: "warcherd_warcher",
  password: "C02tas808",
  database: "warcherd_mysql_test",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect, (err, result) => {
    console.log(result);
  });
});

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(res);
  });
});

// app.get("/", (req, res) => {
//   const sqlInsert =
//     "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('Inception', 'such a good movie!');";
//   db.query(sqlInsert, (err, result) => {
//     res.send("Hello World");
//   });
// });

app.listen(3001, () => {
  console.log("testing s");
});
