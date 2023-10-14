import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";

//It can manage multiple reducers. Under the hood, it murges all the reducers into big one.
const store = configureStore({
  reducer: { cart: cartReducer },
});

export default store;
