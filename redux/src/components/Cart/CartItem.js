import classes from "./CartItem.module.css";

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const CartItem = (props) => {
  const { title, quantity, price } = props.item;

  const dispatch = useDispatch();

  const addOnHandler = () => {
    dispatch(cartActions.addToCart(props.item));
  };
  const onRemoveHandler = () => {
    dispatch(cartActions.removeFromCart(props.item));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${price * quantity}{" "}
          <span className={classes.itemprice}>(${price}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={onRemoveHandler}>-</button>
          <button onClick={addOnHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
