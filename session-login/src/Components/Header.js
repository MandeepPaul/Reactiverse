import React from "react";

import Home from "./Home";
import Button from "./UI/Button/Button";

const Header = (props) => {
  const logoutHandler = () => {
    props.logout();
  };
  return (
    <>
      <header className="flex bg-slate-800 p-1 font-serif">
        <h1 className=" w-full text-center pt-2 text-xl text-white">
          Welcome Back {props.name}!
        </h1>
        <Button
          onClick={logoutHandler}
          className={"bg-cyan-800 text-cyan-300 hover:bg-cyan-700 p-2"}
        >
          Logout
        </Button>
      </header>
      <Home />
    </>
  );
};

export default Header;
