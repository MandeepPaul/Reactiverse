import React, { useEffect, useState } from "react";
import Card from "./UI/Card/Card";
import Button from "./UI/Button/Button";
import Input from "./UI/Input/inputField";

const LoginPage = (props) => {
  const [isFormValid, formValidity] = useState(false);

  const [isEmailValid, emailValidity] = useState(false);
  const [isPasswordValid, passwordValidity] = useState(false);

  const emailChangeHandler = (event) => {
    console.log(event.target.value);

    if (!event.target.value.includes("@")) emailValidity(false);
    else emailValidity(true);
  };

  const passwordChangeHandler = (event) => {
    console.log(event.target.value.trim().length);

    if (event.target.value.trim().length < 6) passwordValidity(false);
    else passwordValidity(true);
  };

  useEffect(() => {
    if (isEmailValid && isPasswordValid) {
      formValidity(true);
    }
    console.log("Validating..");
  }, [isEmailValid, isPasswordValid]);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    props.submit();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card>
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form className="space-y-4" onSubmit={formSubmitHandler}>
          <div>
            <label className="block font-medium">Email</label>
            <Input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={emailChangeHandler}
            />
          </div>
          <div>
            <label className="block font-medium">Password</label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={passwordChangeHandler}
            />
          </div>
          <Button onClick={formSubmitHandler} disabled={!isFormValid}>
            LOGIN
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
