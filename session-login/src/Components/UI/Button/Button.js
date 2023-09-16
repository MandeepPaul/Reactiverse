import React from "react";

const Button = (props) => {
  return (
    <button
      type={props.type || "button"}
      className={`w-full bg-green-500 text-white py-2 rounded-md hover:bg-blue-600 ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
