import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { sendCartData } from "./store/cart-action";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let firstRender = true;

function App() {
  const showCart = useSelector((state) => state.uiSlice.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.uiSlice.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sendCartData(cart, firstRender));

    if (firstRender) {
      firstRender = false;
    }
  }, [cart, dispatch]);

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
