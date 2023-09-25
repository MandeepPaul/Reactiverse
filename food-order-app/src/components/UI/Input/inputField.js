import React from "react";
import styles from "./inputField.module.css";
const InputField = (props) => {
  return (
    <input
      type={props.type}
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      defaultValue={props.default}
      min={props.min}
      max={props.max}
      step={props.step}
      onChange={props.onChange}
      className={`${styles.input} ${props.className}`}
    />
  );
};

export default InputField;
