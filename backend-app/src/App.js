import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  let content = <p>Found no movies.</p>;

  function fetchMovieHandler() {
    fetch("https://swapi.dev/api/films/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
      });
  }

  if (movies.length !== 0) {
    content = <MoviesList movies={movies} />;
  }

  return (
    <React.Fragment>
      <section>
        {/* addMovie prop */}
        <AddMovie />
      </section>
      <section>
        {/* fetchAPI */}
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      {/* loading, list, result */}
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;