import React, { useState } from "react";

import styles from "./Meal.module.css";
import Input from "../../UI/Input/inputField";
import Button from "../../UI/Button/Button";

const Meal = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [validity, setValid] = useState(true);

  const price = `${props.price.toFixed(2)}`;

  const quantityHandler = (event) => {
    setQuantity(event.target.value);
  };

  const formSubmitHandler = (event) => {
    if (quantity.length === 0 || quantity < 1 || quantity > 5) {
      setValid(false);
      return;
    }

    setValid(true);
    event.preventDefault();
    const data = {
      id: `${props.id}`,
      name: `${props.itemName}`,
      price: `${props.price}`,
      amount: `${quantity}`,
    };

    props.addtocart(data); //Sending data to parent component
    setQuantity(1);
  };

  return (
    <li>
      <div className={styles.container}>
        <div className={styles.firstColumn}>
          <span
            style={{
              fontWeight: "600",
            }}
          >
            {props.itemName}
          </span>
          <span style={{ fontStyle: "italic" }}>{props.description}</span>
          <span style={{ color: "brown", fontWeight: "600" }}>
            {"$" + price}
          </span>
        </div>

        <form className={styles.secondColumn}>
          <div className={styles.amount}>
            <label
              style={{
                fontWeight: "600",
              }}
            >
              Amount
            </label>
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
              value={quantity}
              min="1"
              max="5"
              step="1"
              onChange={quantityHandler}
            />
          </div>
          <Button onClick={formSubmitHandler}>+Add</Button>
          {!validity && <p>Please enter a valid amount (1-5).</p>}
        </form>
      </div>
      <hr />
    </li>
  );
};

export default Meal;
