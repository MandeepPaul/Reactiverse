import styles from "./CartItem.module.css";
import Button from "../UI/Button/Button";

const CartItem = (props) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.column1}>
          <span>{props.name}</span>
          <div className={styles.pricelabel}>
            <span>{`$${props.price}`}</span>
            <label>{`x ${props.label}`}</label>
          </div>
        </div>
        <div className={styles.column2}>
          <Button onClick={props.onRemove}>-</Button>
          <Button onClick={props.addition}>+</Button>
        </div>
      </div>
      <hr
        style={{
          backgroundColor: "brown",
          height: "1px",
          margin: "5px",
          border: "none",
        }}
      />
    </>
  );
};

export default CartItem;
