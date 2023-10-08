import { useState } from "react";

const useFetch = (url) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fetchHandler = async (method = "GET", payload = null) => {
    setError(null);

    if (!["GET", "POST"].includes(method)) {
      console.log("Method nt suppoted yet");
      setError("Invalid Request!");
      return;
    }

    if (method === "GET") {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Something went wrong while fetching data!");
        }
        const data = await response.json();

        const loadedMovies = [];

        for (const key in data) {
          loadedMovies.push({
            id: key,
            title: data[key].title,
            openingText: data[key].openingText,
            releaseDate: data[key].releaseDate,
          });
        }

        setResult(loadedMovies);
      } catch (error) {
        console.log(error.message);
        setError("Fetching data failed!");
      }
    } else if (method === "POST") {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        header: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Sending POST request failed!");
          }
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  //   useEffect(() => {
  //     fetchHandler();
  //   }, [fetchHandler]);

  return {
    result,
    error,
    fetchRequest: fetchHandler,
  };
};

export default useFetch;
