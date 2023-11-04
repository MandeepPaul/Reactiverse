import React, { useState, useEffect } from "react";

import useFetch from "../src/hooks/use-fetch";
import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const { result, error, fetchRequest } = useFetch(
    "https://reactiverse-2842e-default-rtdb.firebaseio.com/movie.json"
  );

  const fetchMovieHandler = async () => {
    setLoading(true);
    await fetchRequest();
    setLoading(false);
  };

  const addMovieHandler = (movie) => {
    fetchRequest("POST", movie);
  };

  useEffect(() => {
    if (result !== null) {
      setMovies(result);
    }
  }, [result, error]);

  let content;

  if (loading) {
    content = <p>Loading...</p>;
  } else if (movies.length !== 0) {
    content = <MoviesList movies={movies} />;
  } else if (movies.length === 0) {
    content = <p>Found no movies.</p>;
  }

  if (error) content = <p>{error}</p>;

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

//Without using customHook

/* //It will create a new node in firebase database with a name movies.json
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
*/
