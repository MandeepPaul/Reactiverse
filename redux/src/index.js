import ReactDOM from "react-dom/client";

//To Provide redux store to react app. We choose to provide it to highest order component in the tree.
import { Provider } from "react-redux";
import store from "./store/redux-toolkit";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
