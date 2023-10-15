import { useSelector, useDispatch } from "react-redux";
import classes from "./CartButton.module.css";

import { visibilityActions } from "../../store/cartVisibility-slice";
const CartButton = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const showCart = useSelector((state) => state.cartVisibility.showCart);
  const dispatch = useDispatch();

  const showCartHandler = () => {
    dispatch(visibilityActions.showCart());
  };
  return (
    <button className={classes.button} onClick={showCartHandler}>
      <span>{showCart ? "Hide Cart" : "See Cart"}</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
