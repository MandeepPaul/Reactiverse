import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cart-slice";
import uiSlice from "./ui-slice";

//It can manage multiple reducers. Under the hood, it murges all the reducers into big one.
const store = configureStore({
  reducer: { cart: cartReducer, uiSlice: uiSlice },
});

export default store;
