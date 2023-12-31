import React from "react";

import styles from "./Button.module.css";

const Button = (props) => {
  const classes = styles.button + " " + props.className;

  return (
    <button
      onClick={props.onClick}
      type={props.type || "button"}
      className={classes}
    >
      {props.children}
    </button>
  );
};

export default Button;
