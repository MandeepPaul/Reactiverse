import React, { useRef } from "react";
import styles from "./AddUser.module.css";
import buttonStyles from "./button.module.css";

const Form = (props) => {
  const nameRef = useRef();
  const ageRef = useRef();

  const authenticator = () => {
    const user = {
      key: Math.random().toString(),
      name: nameRef.current.value,
      age: ageRef.current.value,
    };

    user.age > 0 && props.userInput(user);
  };

  return (
    <div className={styles.input}>
      <label>Username</label>
      <input type="text" ref={nameRef}></input>
      <label>Age</label>
      <input type="number" ref={ageRef}></input>
      <button className={buttonStyles.button} onClick={authenticator}>
        Add User
      </button>
    </div>
  );
};

export default Form;
