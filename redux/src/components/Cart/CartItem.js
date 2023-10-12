import classes from "./CartItem.module.css";

//useSelector is the custom hook made by the react-redux team.
import { useSelector, useDispatch } from "react-redux";

const CartItem = (props) => {
  const { title, quantity, total, price } = props.item;

  //Redux will automatically set up subscription to Redux store for this component.
  //It will automatically execute whenever value in the store update.
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const addOnHandler = () => {
    dispatch({ type: "incrementby", amount: 5 });
  };
  const onRemoveHandler = () => {
    dispatch({ type: "decrement" });
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{counter}</span>
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
