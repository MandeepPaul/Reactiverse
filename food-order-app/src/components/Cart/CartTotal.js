import React, { useContext } from "react";

import Button from "../UI/Button/Button";
import classes from "./CartItem.module.css";
import cartContext from "../../store/cart-context";

const CartTotal = (props) => {
  const ctx = useContext(cartContext);

  const price = ctx.items.reduce((currentTotal, item) => {
    return +item.price * +item.amount + +currentTotal;
  }, 0);

  const postOrderHandler = () => {
    console.log("Ordering.....");
  };

  return (
    <>
      {ctx.items.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          Cart is Empty! Add items to see it here.
        </p>
      ) : (
        ""
      )}
      <div className={classes.container}>
        <h2>Grand Total</h2>
        <div className={classes.priceSection}>
          <span>{`$${price.toFixed(2)}`}</span>
          <div>
            <Button onClick={props.onClose}>Close</Button>
            <Button onClick={postOrderHandler}>Order</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartTotal;
