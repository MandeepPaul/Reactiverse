import React from "react";

const Header = (props) => {
  return (
    <header className="flex gap-2 justify-end mx-3 my-1 bg-transparent">
      <button className="border-2 px-2 border-amber-500 hover:rounded-lg">
        LOGOUT
      </button>
      <p>{props.name}</p>
    </header>
  );
};

export default Header;
