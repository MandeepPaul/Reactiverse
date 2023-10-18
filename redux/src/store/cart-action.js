import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const sendCartData = (cart, flag) => {
  return async (dispatch) => {
    //This part for GET request first time when component mount.
    if (flag) {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Receiving...",
          message: "Receiving cart data!",
        })
      );

      const receiveData = async () => {
        const response = await fetch(
          "https://reactiverse-2842e-default-rtdb.firebaseio.com/AromaUsers.json"
        );

        if (!response.ok) {
          throw new Error("Receiving data failed!");
        }

        return await response.json();
      };

      try {
        const cartData = await receiveData();

        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Received",
            message: "Received cart data!",
          })
        );

        //If node in the database is completely null, them instead of receiving error, we retrieve empty cart.
        if (cartData === null) {
          dispatch(
            cartActions.replaceCart({
              cartItemList: [],
              totalAmount: 0,
              totalQuantity: 0,
            })
          );
        } else {
          dispatch(
            cartActions.replaceCart({
              cartItemList: cartData.cartItemList || [],
              totalAmount: cartData.totalAmount || 0,
              totalQuantity: cartData.totalQuantity || 0,
            })
          );
        }
      } catch (error) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Retrieving cart data failed!",
          })
        );
      }
      return;
    }

    //This part for PUT request after first render.
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
