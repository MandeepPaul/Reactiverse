import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
});

export default AuthContext;

//Behind the scene, Reacthas component-wide state storage - Context API
