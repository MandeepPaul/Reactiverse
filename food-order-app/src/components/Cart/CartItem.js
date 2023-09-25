import styles from "./CartItem.module.css";
import Button from "../UI/Button/Button";

const CartItem = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.column1}>
          <span>Name</span>
          <div className={styles.pricelabel}>
            <span>Price</span>
            <label>x 1</label>
          </div>
        </div>
        <div className={styles.column2}>
          <Button>-</Button>
          <Button>+</Button>
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
