import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
});

export default AuthContext;

//Behind the scene, Reacthas component-wide state storage - Context API

/*Context Limitations:-
- React context is NOT optimized for high frequency changes.(once a minute is fine)
- Not right approach if we have state changes happens much more frequent.
- It should also not tobe used to replace all component communication and props.

- Fir high frequency, there is a better way called REDUX.
*/
