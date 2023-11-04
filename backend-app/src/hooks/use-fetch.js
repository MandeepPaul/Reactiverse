import { useState } from "react";

const useFetch = (url) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fetchHandler = async (method = "GET", payload = null) => {
    setError(null);

    if (!["GET", "POST"].includes(method)) {
      setError("Invalid Request!");
      console.log("Method not supported yet");
      return;
    }

    try {
      const response = await fetch(url, {
        method: method,
        body: payload ? JSON.stringify(payload) : null,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while fetching data!");
      }

      const data = await response.json();

      if (method === "GET") {
        const loadedMovies = Object.entries(data).map(([id, movie]) => ({
          id: id,
          title: movie.title,
          openingText: movie.openingText,
          releaseDate: movie.releaseDate,
        }));

        setResult(loadedMovies);
      }
    } catch (error) {
      console.log(error.message);
      setError("Fetching data failed!");
    }
  };

  return {
    result,
    error,
    fetchRequest: fetchHandler,
  };
};

export default useFetch;
