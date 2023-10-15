import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFetch from "./hooks/use-fetch";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { cartActions } from "./store/cart-slice";

function App() {
  const showCart = useSelector((state) => state.cartVisibility.showCart);
  const cart = useSelector((state) => state.cart);
  const [firstRender, setFirstRender] = useState(true);

  const dispatch = useDispatch();

  const { result, error, fetchRequest } = useFetch(
    "https://reactiverse-2842e-default-rtdb.firebaseio.com/AromaUsers.json"
  );

  const putData = async () => {
    await fetchRequest("PUT", cart);
  };

  useEffect(() => {
    if (!firstRender) {
      putData();
    } else {
      setFirstRender(false);
    }
  }, [cart, firstRender]);

  const fetchData = async () => {
    await fetchRequest();
  };

  useEffect(() => {
    if (error) {
      console.log("Failed Fetching data!");
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (result !== null) dispatch(cartActions.replaceCart(result));
  }, [result, dispatch]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
