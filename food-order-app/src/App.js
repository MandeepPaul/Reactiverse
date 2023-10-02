import React, { useState } from "react";

import ReactDOM from "react-dom";

import Header from "./components/Layout/Header/Header";
import MealContent from "./components/Meals/MealContent";
import CartContent from "./components/Cart/CartContent";

import cartContext from "./store/cart-context";

function App() {
  const [cartOverlay, setOverlay] = useState(false);

  const [cartItemList, setItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const addItemToCartHandler = (newItem) => {
    const existingIndex = cartItemList.findIndex(
      (existingItem) => existingItem.id === newItem.id
    );

    //In case, we add item that is already in the cart before.
    if (existingIndex >= 0) {
      const existingItem = cartItemList[existingIndex];

      const updatedExistingItem = {
        ...existingItem,
        amount: +existingItem.amount + +newItem.amount,
        //Here we can add all price too but at the time of removeItemHandler, there will be an issue.
      };

      // cartItemList[existingIndex] = updatedExistingItem; //Recommended to maintain immutability. Not right approach!

      setItems((prevItems) => {
        const updatedCartItemList = [...prevItems];
        updatedCartItemList[existingIndex] = updatedExistingItem; //Replace the existing item with new quantity.
        return updatedCartItemList;
      });
    } else {
      const updatedCartItemList = [...cartItemList, newItem];
      setItems(updatedCartItemList);
    }
    setTotalQuantity((prevState) => +totalQuantity + +newItem.amount);
  };

  const removeItemFromCartHandler = (removableItem) => {
    const existingIndex = cartItemList.findIndex(
      (existingItem) => existingItem.id === removableItem.id
    );

    const existingItem = cartItemList[existingIndex];

    if (existingItem.amount >= 2) {
      //When 2 or more items
      const updatedExistingItem = {
        ...existingItem,
        amount: +existingItem.amount - +1,
        //Here we can add all price too but at the time of removeItemHandler, there will be an issue.
      };

      setItems((prevItems) => {
        const updatedCartItemList = [...prevItems];
        updatedCartItemList[existingIndex] = updatedExistingItem; //Replace the existing item with new quantity.
        return updatedCartItemList;
      });
    } else {
      //when 1 item left
      setItems(cartItemList.filter((item) => item.id !== removableItem.id));
    }
    setTotalQuantity((prevState) => +totalQuantity - +1);
  };

  //--------Code-For-Overlay------------
  const showOverlay = () => {
    setOverlay(true);
  };

  const closeOverlay = () => {
    setOverlay(false);
  };
  //-------------------------------------
  const CartContextHandler = {
    items: cartItemList,
    quantity: totalQuantity,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <cartContext.Provider value={CartContextHandler}>
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
