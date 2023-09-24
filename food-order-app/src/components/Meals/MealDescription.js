import Card from "../UI/Card/Card";
import classes from "./MealDescription.module.css";

const MealsDescription = () => {
  return (
    <Card className={classes.description}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favourite meal from our broad selection of favourite
        mealsand enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
    </Card>
  );
};

export default MealsDescription;
