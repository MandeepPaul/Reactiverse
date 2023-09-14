import React, { useRef } from "react";
import Card from "./UI/Card";
import Button from "./UI/Button";

import classes from "./AddUser.module.css";

const Form = (props) => {
  const nameRef = useRef();
  const ageRef = useRef();

  const authenticator = (event) => {
    event.preventDefault();
    const user = {
      key: Math.random().toString(),
      name: nameRef.current.value,
      age: ageRef.current.value,
    };
    console.log(user.age + " " + user.name);

    //Better way than (user.name === "")
    if (user.name.trim().length === 0 || user.age.trim().length === 0) {
      props.error(`Please enter a valid name and age(non empty values)`);
    } else if (user.age < 1) {
      props.error(`Please enter a valid age (> 0)`);
    } else {
      props.userInput(user);
    }

    nameRef.current.value = "";
    ageRef.current.value = "";
  };

  return (
    <Card className={classes.input}>
      <form onSubmit={authenticator}>
        <label>Username</label>
        <input type="text" ref={nameRef}></input>
        <label>Age</label>
        <input type="number" ref={ageRef}></input>
        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};

export default Form;
