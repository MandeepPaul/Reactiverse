import { useSelector, useDispatch } from "react-redux";
import classes from "./CartButton.module.css";

import { uiActions } from "../../store/ui-slice";
const CartButton = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const showCart = useSelector((state) => state.uiSlice.cartIsVisible);

  const dispatch = useDispatch();

  const showCartHandler = () => {
    dispatch(uiActions.toggle());
  };
  return (
    <button className={classes.button} onClick={showCartHandler}>
      <span>{showCart ? "Hide Cart" : "See Cart"}</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
