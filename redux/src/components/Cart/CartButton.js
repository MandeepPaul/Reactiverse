import { useSelector, useDispatch } from "react-redux";
import classes from "./CartButton.module.css";

import { cartActions } from "../../store/cartSlice";
const CartButton = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const showCart = useSelector((state) => state.cart.showCart);
  const dispatch = useDispatch();

  const showCartHandler = () => {
    dispatch(cartActions.showCart());
  };
  return (
    <button className={classes.button} onClick={showCartHandler}>
      <span>{showCart ? "Hide Cart" : "See Cart"}</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
