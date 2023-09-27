import React, { useState } from "react";

import styles from "./Meal.module.css";
import Input from "../../UI/Input/inputField";
import Button from "../../UI/Button/Button";

const Meal = (props) => {
  const [quantity, setQuantity] = useState(1);

  //Inline CSS
  const semiBoldStyle = {
    fontWeight: "600",
  };

  const price = `${props.price.toFixed(2)}`;

  const quantityHandler = (event) => {
    setQuantity(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      id: `${props.id}`,
      name: `${props.itemName}`,
      price: `${props.price}`,
      amount: `${quantity}`,
    };

    console.log(data);
    props.addtocart(data); //Sending data to parent component
  };

  return (
    <li>
      <div className={styles.container}>
        <div className={styles.firstColumn}>
          <span style={semiBoldStyle}>{props.itemName}</span>
          <span style={{ fontStyle: "italic" }}>{props.description}</span>
          <span style={{ color: "brown", fontWeight: "600" }}>{price}</span>
        </div>

        <form className={styles.secondColumn}>
          <div className={styles.amount}>
            <label style={semiBoldStyle}>Amount</label>
            {/* OPTIONAL but for proper accessibility:
            + Two major disadvantages which are not immediately obvious:

            - Clicking on ANY label will always select the same, first input element - even if that's not the one belonging to the actual MeatItem

            - Screenreaders won't be able to connect labels + inputs correctly (since all labels point at the same input)
            
            - Added a id prop.
            */}
            <Input
              id={props.id}
              className={styles.amountField}
              type="number"
              default="1"
              min="1"
              max="5"
              step="1"
              onChange={quantityHandler}
            />
          </div>
          <Button onClick={formSubmitHandler}>+Add</Button>
        </form>
      </div>
      <hr />
    </li>
  );
};

export default Meal;
