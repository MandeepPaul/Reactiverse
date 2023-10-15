import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false,
};

const cartVisibility = createSlice({
  name: "cartVisibility",
  initialState,
  reducers: {
    showCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const visibilityActions = cartVisibility.actions;

export default cartVisibility.reducer;
