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

  const submitOrderHandler = async () => {
    console.log("Ordering.....");
    fetchRequest("PUT", currentState);
    dispatchCart({ type: "SUBMIT" });
    console.log(currentState);
  };

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }
    fetchRequest("PUT", currentState);
    console.log("Inside useEffect");
  }, [currentState]);

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
