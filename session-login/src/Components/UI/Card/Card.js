import React from "react";

const Card = (props) => {
  return (
    <div className={`bg-white p-8 rounded-lg shadow-md ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Card;
