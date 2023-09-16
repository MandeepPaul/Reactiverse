import React, { useRef } from "react";
import Card from "./UI/Card/Card";
import Button from "./UI/Button/Button";
import Input from "./UI/Input/inputField";

const LoginPage = (props) => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const formSubmitHandler = (event) => {
    console.log(
      `${usernameRef.current.getInputValue()} and ${passwordRef.current.getInputValue()}`
    );
    event.preventDefault();
    props.submit();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card>
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form className="space-y-4" onSubmit={formSubmitHandler}>
          <div>
            <label className="block font-medium">Username</label>
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              ref={usernameRef}
            />
          </div>
          <div>
            <label className="block font-medium">Password</label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              ref={passwordRef}
            />
          </div>
          <Button onClick={formSubmitHandler}>LOGIN</Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
