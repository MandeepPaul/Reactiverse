import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFetch from "./hooks/use-fetch";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { uiActions } from "./store/ui-slice";
import { cartActions } from "./store/cart-slice";

let firstRender = true;

function App() {
  const showCart = useSelector((state) => state.uiSlice.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.uiSlice.notification);

  const dispatch = useDispatch();

  const { result, error, fetchRequest } = useFetch(
    "https://reactiverse-2842e-default-rtdb.firebaseio.com/AromaUsers.json"
  );

  const fetchData = async () => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "receiving...",
        message: "Receiving cart data!",
      })
    );
    await fetchRequest();
  };

  useEffect(() => {
    if (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
      return;
    }

    if (result !== null) {
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Received!",
          message: "Received cart data successfully!",
        })
      );

      //Updating cart to match with existing cart.
      dispatch(cartActions.replaceCart(result));
    }
  }, [result, dispatch, error]);

  const putData = async () => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    await fetchRequest("PUT", cart);

    dispatch(
      uiActions.showNotification({
        status: "success",
        title: "Success!",
        message: "Sent cart data successfully!",
      })
    );
  };

  useEffect(() => {
    if (firstRender) {
      //Reload existing cart.
      fetchData();
      firstRender = false;
      return;
    }
    //Update cart at backend
    putData();
    // eslint-disable-next-line
  }, [cart]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
