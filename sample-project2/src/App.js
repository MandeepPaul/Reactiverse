import React, { useState } from "react";
import Form from "./Components/Form";
import Result from "./Components/Result";

function App() {
  const [userArray, setUserArray] = useState([]);

  const inputHandler = (user) => {
    setUserArray((prevUserArray) => [...prevUserArray, user]);
  };

  return (
    <>
      <Form userInput={inputHandler} />
      <Result usersData={userArray} />
    </>
  );
}

export default App;
