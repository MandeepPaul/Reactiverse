import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

//Whatever this function needs will get it automatically by react.
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.includes("@"),
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.includes("@"),
    };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6,
    };
  }
  if (action.type === "INPUT_BLUR") {
    //Checking for prevState
    return {
      value: state.value,
      isValid: state.value.trim().length > 6,
    };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  /*
  emailState: State snapshot used in component re-rendering cycle.
  emailStateDispatch: Used to dispatch new state(state update) through emailReducer function.
  emailReducer: Function define outside this functional component because we dont need any data that is used in this component plus to keep code clean.
                This function will trigger automatically once an action is dispatched via dispatchFunction
  secondArgument: Initial state values.
  
  */
  const [emailState, emailStateDispatch] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, paswordStateDispatch] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };

    //Further optimization of useEffect: Now useEffect will run if validity change not when value change!
    //Helps to avoid unnecessary execution.
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    emailStateDispatch({ type: "USER_INPUT", val: event.target.value });

    /*We will not receive a latest state snapshot here because react schedule state change.
    setFormIsValid(emailState.isValid && passwordState.isValid);

    We will use direct value here from event.
    */
    setFormIsValid(
      event.target.value.trim().includes("@") && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    paswordStateDispatch({ type: "USER_INPUT", val: event.target.value });

    //Same here, because react schedules the state update, we are using direct value here.
    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  // const validateEmailHandler = () => {
  //   setEmailIsValid(enteredEmail.includes("@"));
  // };

  const validateEmailHandler = () => {
    emailStateDispatch({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    paswordStateDispatch({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.isValid, passwordState);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
