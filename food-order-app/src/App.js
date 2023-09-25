import React, { useState } from "react";

import ReactDOM from "react-dom";

import Header from "./components/Layout/Header/Header";
import MealContent from "./components/Meals/MealContent";
import CartContent from "./components/Cart/CartContent";
function App() {
  const [cartOverlay, setOverlay] = useState(false);

  const showOverlay = () => {
    setOverlay(true);
  };

  const closeOverlay = () => {
    setOverlay(false);
  };

  return (
    <>
      <Header showCart={showOverlay} />
      <MealContent />
      {cartOverlay &&
        ReactDOM.createPortal(
          <CartContent onClose={closeOverlay} />,
          document.getElementById("back-drop")
        )}
    </>
  );
}

export default App;
