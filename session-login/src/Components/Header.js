import React from "react";

import Button from "./UI/Button/Button";

const Header = (props) => {
  const logoutHandler = () => {
    props.logout();
  };
  return (
    <header className="flex gap-2 justify-end mx-3 my-1 bg-transparent">
      <Button onClick={logoutHandler} className={"w-auto p-2"}>
        LOGOUT
      </Button>
      <p>{props.name}</p>
    </header>
  );
};

export default Header;
