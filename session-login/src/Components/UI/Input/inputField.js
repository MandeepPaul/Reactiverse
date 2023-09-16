import React, { useRef, useImperativeHandle, forwardRef } from "react";

const InputField = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    getInputValue: () => {
      if (inputRef.current) {
        return inputRef.current.value;
      }
      return "";
    },
  }));

  return (
    <input
      ref={inputRef}
      type={props.type}
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      className={`w-full border rounded-md py-2 px-3 ${props.className}`}
    />
  );
});

export default InputField;
