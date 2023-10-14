import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItemList: [],
  totalAmount: 0,
  totalQuantity: 0,
  showCart: false,
};

const cartState = createSlice({
  name: "counter",
  initialState,
  reducers: {
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

      state.totalAmount += +action.payload.price;
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
      state.totalQuantity--;
    },
    showCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const cartActions = cartState.actions;

export default cartState.reducer;
