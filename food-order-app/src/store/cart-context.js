import React from "react";

//Default values when there is no activr PROVIDER higher up the tree.
const CartContext = React.createContext({
  mealList: [],
  quantity: 0,
});

export default CartContext;
