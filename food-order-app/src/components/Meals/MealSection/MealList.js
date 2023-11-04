import { useContext } from "react";

import Meal from "./Meal";
import Card from "../../UI/Card/Card";
import styles from "./MealList.module.css";

import cartContext from "../../../store/cart-context";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const MealList = () => {
  const ctx = useContext(cartContext);

  const addToCart = (data) => {
    ctx.addItem(data);
  };

  const mealList = DUMMY_MEALS.map((item) => (
    <Meal
      id={item.id}
      key={item.id}
      itemName={item.name}
      description={item.description}
      price={item.price}
      addtocart={addToCart}
    />
  ));

  return (
    <Card className={styles.list}>
      <ul>{mealList}</ul>
    </Card>
  );
};

export default MealList;
