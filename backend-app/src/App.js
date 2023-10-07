import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let content = <p>Found no movies.</p>;

  const fetchMovieHandler = useCallback(() => {
    setLoading(true);
    setError(null);

    //It will create a new node in firebase database with a name movies.json
    fetch("https://reactiverse-2842e-default-rtdb.firebaseio.com/movie.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong while fetching data!");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const loadedMovies = [];

        for (const key in data) {
          loadedMovies.push({
            id: key,
            title: data[key].title,
            openingText: data[key].openingText,
            releaseDate: data[key].releaseDate,
          });
        }
        // const transformedMovies = loadedMovies.map((movieData) => {
        //   return {
        //     id: movieData.episode_id,
        //     title: movieData.title,
        //     openingText: movieData.opening_crawl,
        //     releaseDate: movieData.release_date,
        //   };
        // });
        console.log(loadedMovies);
        setMovies(loadedMovies);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, []);

  const addMovieHandler = (movie) => {
    fetch("https://reactiverse-2842e-default-rtdb.firebaseio.com/movie.json", {
      method: "POST",
      body: JSON.stringify(movie),
      header: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sending POST request failed!");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //By using useEffect here, we want to fetch data whenever component loads.
  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  if (loading) {
    content = <p>Loading...</p>;
  } else if (movies.length !== 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }
  return (
    <React.Fragment>
      <section>
        {/* addMovie prop */}
        <AddMovie onAddMovie={addMovieHandler} />
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
