import styles from "./Meal.module.css";
import Input from "../UI/Input/inputField";
import Button from "../UI/Button/Button";

const Meal = (props) => {
  //Inline CSS
  const semiBoldStyle = {
    fontWeight: "600",
  };

  const price = `${props.price.toFixed(2)}`;

  return (
    <li>
      <div className={styles.container}>
        <div className={styles.firstColumn}>
          <span style={semiBoldStyle}>{props.itemName}</span>
          <span style={{ fontStyle: "italic" }}>{props.desription}</span>
          <span style={{ color: "brown", fontWeight: "600" }}>{price}</span>
        </div>

        <div className={styles.secondColumn}>
          <div className={styles.amount}>
            <label style={semiBoldStyle}>Amount</label>
            <Input className={styles.amountField} default="1" />
          </div>
          <Button>+Add</Button>
        </div>
      </div>
      <hr />
    </li>
  );
};

export default Meal;
