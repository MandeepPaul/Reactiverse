import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItemList: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartState = createSlice({
  name: "counter",
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.cartItemList = action.payload.cartItemList;
      state.totalAmount = parseFloat(action.payload.totalAmount).toFixed(2);
      state.totalQuantity = action.payload.totalQuantity;
    },
    addToCart(state, action) {
      let existingIndex = state.cartItemList.findIndex(
        (existingItem) => existingItem.id === action.payload.id
      );

      if (existingIndex >= 0) {
        const existingItem = state.cartItemList[existingIndex];

        existingItem.quantity += +1;
      } else {
        state.cartItemList.push(action.payload);
      }

      state.totalAmount = (
        parseFloat(state.totalAmount) + parseFloat(action.payload.price)
      ).toFixed(2);
      state.totalQuantity++;
    },
    removeFromCart(state, action) {
      let existingIndex = state.cartItemList.findIndex(
        (existingItem) => existingItem.id === action.payload.id
      );

      const existingItem = state.cartItemList[existingIndex];
      if (existingItem.quantity >= 2) {
        //When 2 or more items
        existingItem.quantity -= +1;
      } else {
        //when 1 item left
        state.cartItemList = state.cartItemList.filter(
          (item) => item.id !== action.payload.id
        );
      }
      state.totalAmount = (
        parseFloat(state.totalAmount) - parseFloat(action.payload.price)
      ).toFixed(2);
      state.totalQuantity--;
    },
  },
});

export const cartActions = cartState.actions;

export default cartState.reducer;
