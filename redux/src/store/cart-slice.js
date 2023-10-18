import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

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
      state.cartItemList = action.payload.cartItemList || [];
      state.totalAmount =
        parseFloat(action.payload.totalAmount).toFixed(2) || +0;
      state.totalQuantity = action.payload.totalQuantity || +0;
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

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendData = async () => {
      const response = await fetch(
        "https://reactiverse-2842e-default-rtdb.firebaseio.com/AromaUsers.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending data failed!");
      }
    };

    try {
      await sendData();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const cartActions = cartState.actions;

export default cartState.reducer;
