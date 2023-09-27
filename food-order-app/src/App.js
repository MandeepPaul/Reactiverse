import React, { useState, useContext } from "react";

import ReactDOM from "react-dom";

import Header from "./components/Layout/Header/Header";
import MealContent from "./components/Meals/MealContent";
import CartContent from "./components/Cart/CartContent";

import cartContext from "./store/cart-context";

function App() {
  const [cartOverlay, setOverlay] = useState(false);

  const ctx = useContext(cartContext);

  const showOverlay = () => {
    setOverlay(true);
  };

  const closeOverlay = () => {
    setOverlay(false);
  };

  return (
    <cartContext.Provider value={ctx}>
      <Header showCart={showOverlay} />
      <main>
        <MealContent />
        {cartOverlay &&
          ReactDOM.createPortal(
            <CartContent onClose={closeOverlay} />,
            document.getElementById("back-drop")
          )}
      </main>
    </cartContext.Provider>
  );
}

export default App;
