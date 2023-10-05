import React, { useState } from "react";
import ReactDOM from "react-dom";

import Header from "./components/Layout/Header/Header";
import MealContent from "./components/Meals/MealContent";
import CartContent from "./components/Cart/CartContent";

import CartProvider from "./store/cartProvider";

function App() {
  const [cartOverlay, setOverlay] = useState(false);

  //--------Code-For-Overlay------------
  const showOverlay = () => {
    setOverlay(true);
  };

  const closeOverlay = () => {
    setOverlay(false);
  };

  return (
    <CartProvider>
      <Header showCart={showOverlay} />
      <main>
        <MealContent />
        {cartOverlay &&
          ReactDOM.createPortal(
            <CartContent onClose={closeOverlay} />,
            document.getElementById("back-drop")
          )}
      </main>
    </CartProvider>
  );
}

export default App;
