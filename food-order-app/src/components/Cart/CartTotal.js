import Button from "../UI/Button/Button";
import classes from "./CartItem.module.css";

const CartTotal = () => {
  return (
    <div className={classes.container}>
      <h2>Grand Total</h2>
      <div className={classes.priceSection}>
        <span>Price</span>
        <div>
          <Button>Close</Button>
          <Button>Order</Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
