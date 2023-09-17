import React, { useState } from "react";
import Header from "./Components/Header";
import LoginPage from "./Components/LoginPage";

function App() {
  const [isLogin, setLogin] = useState(false);

  const loginHandler = () => {
    localStorage.setItem("isLogin", "1");
    setLogin(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLogin");
    setLogin(false);
  };

  return (
    <>
      {isLogin ? (
        <Header logout={logoutHandler} name="Mandeep" />
      ) : (
        <LoginPage submit={loginHandler} />
      )}
    </>
  );
}

export default App;
