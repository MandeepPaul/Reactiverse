import React from "react";
import classes from "./Header.module.css";
import CartButton from "../../Cart/CartButton";
import mealImage from "../../../asserts/meals.jpg";

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <h2>ReactMeals</h2>
        <CartButton />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImage} alt="Table full of delicious food" />
      </div>
    </>
  );
};

export default Header;
