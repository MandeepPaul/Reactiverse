import React, { useEffect, useReducer, useState } from "react";

import CartContext from "./cart-context";
import useFetch from "../hooks/use-fetch";

const defaultState = {
  cartItemList: [],
  totalQuantity: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    let existingIndex = state.cartItemList.findIndex(
      (existingItem) => existingItem.id === action.val.id
    );

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
    let existingIndex = state.cartItemList.findIndex(
      (existingItem) => existingItem.id === action.val.id
    );

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
  } else if (action.type === "EXISTING") {
    return {
      cartItemList: action.list,
      totalQuantity: action.amount,
    };
  }

  return defaultState;
};

const CartProvider = (props) => {
  const [currentState, dispatchCart] = useReducer(cartReducer, defaultState);
  const [initialRender, setInitialRender] = useState(true);
  const { result, error, fetchRequest } = useFetch(
    "https://reactiverse-2842e-default-rtdb.firebaseio.com/reactMeals.json"
  );

  const addItemToCartHandler = (newItem) => {
    dispatchCart({ type: "ADD", val: newItem });
  };

  const removeItemFromCartHandler = (removableItem) => {
    dispatchCart({ type: "REMOVE", val: removableItem });
  };

  // Function to get the current formatted time
  function getCurrentTime() {
    const currentTime = new Date();
    return currentTime.toLocaleTimeString();
  }

  // Function to get the current formatted date
  function getCurrentDate() {
    const currentDate = new Date();
    return currentDate.toLocaleDateString();
  }

  const updatedData = {
    ...currentState,
    time: getCurrentTime(),
    date: getCurrentDate(),
  };

  const submitOrderHandler = () => {
    fetchRequest("POST", updatedData);
    if ((prevState) => prevState.error) {
      return;
    }

    console.log("Order Placed!");
    dispatchCart({ type: "SUBMIT" });
    localStorage.clear();
    console.log(currentState);
  };

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    dispatchCart({
      type: "EXISTING",
      list: cartData.cartItemList,
      amount: cartData.totalQuantity,
    });
  }, []);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }
    localStorage.setItem("cart", JSON.stringify(currentState));
    console.log("Inside useEffect");
    error && console.log(error);
    result && console.log(result);
  }, [currentState, error, result, initialRender]);

  //-------------------------------------
  const CartContextHandler = {
    items: currentState.cartItemList,
    quantity: currentState.totalQuantity,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    submitOrder: submitOrderHandler,
  };

  return (
    <CartContext.Provider value={CartContextHandler}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
