import styles from "./CartItem.module.css";
import Button from "../UI/Button/Button";

const CartItem = (props) => {
  const addButtonHandler = () => {
    props.addition(props.item);
  };

  const removeButtonHandler = () => {
    props.onRemove(props.item);
  };

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
          <Button onClick={removeButtonHandler}>-</Button>
          <Button onClick={addButtonHandler}>+</Button>
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
