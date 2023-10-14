import { useSelector } from "react-redux";

import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = () => {
  const cartItemList = useSelector((state) => state.cart.cartItemList);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {cartItemList.length === 0 && <p>Cart is Empty!</p>}
      {cartItemList.map((item) => (
        <ul key={item.id}>
          <CartItem item={item} />
        </ul>
      ))}
    </Card>
  );
};

export default Cart;
