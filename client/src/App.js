import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("https://warcherdesign.com/mysql/api/get").then((response) => {
      setMovieReviewList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("https://warcherdesign.com/mysql/api/insert", {
      movieName: movieName,
      movieReview: review,
    });

    setMovieReviewList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]);
  };

  const deleteReview = (movie) => {
    Axios.delete(`https://warcherdesign.com/mysql/api/delete/${movie}`);
  };

  const updateReview = (movie) => {
    Axios.put("https://warcherdesign.com/mysql/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  };

  return (
    <div className="App">
      <h1>Movie Reviews</h1>
      <section className="form">
        <label>Movie Name</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => setMovieName(e.target.value)}
        />
        <label>Review</label>
        <input
          type="text"
          name="review"
          onChange={(e) => setReview(e.target.value)}
        />
        <button onClick={submitReview}>Submit</button>
        {movieReviewList.map((value) => {
          return (
            <div className="card">
              <h1>{value.movieName} </h1>
              <p>{value.movieReview}</p>
              <button
                onClick={() => {
                  deleteReview(value.movieName);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateReview(value.movieName);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default App;
