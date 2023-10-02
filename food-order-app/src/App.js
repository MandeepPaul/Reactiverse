import React, { useState, useReducer } from "react";

import ReactDOM from "react-dom";

import Header from "./components/Layout/Header/Header";
import MealContent from "./components/Meals/MealContent";
import CartContent from "./components/Cart/CartContent";

import cartContext from "./store/cart-context";

const defaultState = {
  cartItemList: [],
  totalQuantity: 0,
};

const cartReducer = (state, action) => {
  let existingIndex = state.cartItemList.findIndex(
    (existingItem) => existingItem.id === action.val.id
  );

  if (action.type === "ADD") {
    let updateList;

    if (existingIndex >= 0) {
      const existingItem = state.cartItemList[existingIndex];

      const updatedExistingItem = {
        ...existingItem,
        amount: +existingItem.amount + +action.val.amount,
        //Here we can add all price too but at the time of removeItemHandler, there will be an issue.
      };

      updateList = [...state.cartItemList];
      updateList[existingIndex] = updatedExistingItem; //Replace the existing item with new quantity.
    } else {
      updateList = [...state.cartItemList, action.val];
    }

    return {
      cartItemList: updateList,
      totalQuantity: +state.totalQuantity + +action.val.amount,
    };
  } else if (action.type === "REMOVE") {
    const existingItem = state.cartItemList[existingIndex];
    let updatedCartItemList;
    if (existingItem.amount >= 2) {
      //When 2 or more items
      const updatedExistingItem = {
        ...existingItem,
        amount: +existingItem.amount - +1,
        //Here we can add all price too but at the time of removeItemHandler, there will be an issue.
      };

      updatedCartItemList = [...state.cartItemList];
      updatedCartItemList[existingIndex] = updatedExistingItem; //Replace the existing item with new quantity.
    } else {
      //when 1 item left
      updatedCartItemList = state.cartItemList.filter(
        (item) => item.id !== action.val.id
      );
    }

    return {
      cartItemList: updatedCartItemList,
      totalQuantity: state.totalQuantity - +1,
    };
  }

  return defaultState;
};

function App() {
  const [cartOverlay, setOverlay] = useState(false);
  const [currentState, dispatchCart] = useReducer(cartReducer, defaultState);

  const addItemToCartHandler = (newItem) => {
    dispatchCart({ type: "ADD", val: newItem });
  };

  const removeItemFromCartHandler = (removableItem) => {
    dispatchCart({ type: "REMOVE", val: removableItem });
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
    items: currentState.cartItemList,
    quantity: currentState.totalQuantity,
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
