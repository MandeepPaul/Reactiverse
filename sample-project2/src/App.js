import React, { useState } from "react";
import Form from "./Components/Form";
import Result from "./Components/Result";
import ErrorMode from "./Components/ErrorMode";

function App() {
  const [userArray, setUserArray] = useState([]);
  const [errorMessage, setMessage] = useState(null);

  const inputHandler = (user) => {
    setUserArray((prevUserArray) => [...prevUserArray, user]);
  };

  const errorHandler = (message) => {
    setMessage(message);
  };

  const resetErrorMode = () => {
    setMessage(null);
  };

  return (
    <>
      {errorMessage !== null ? (
        <ErrorMode message={errorMessage} reset={resetErrorMode} />
      ) : null}
      <Form error={errorHandler} userInput={inputHandler} />
      <Result usersData={userArray} />
    </>
  );
}

export default App;
