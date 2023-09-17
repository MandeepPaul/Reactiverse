import React from "react";

const InputField = (props, ref) => {
  return (
    <input
      type={props.type}
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
      className={`custom-field focus: outline-none focus:ring-2 focus:ring-green-400 invalid:focus-pink-600 invalid:text-pink-600 ${props.className}`}
    />
  );
};

export default InputField;
