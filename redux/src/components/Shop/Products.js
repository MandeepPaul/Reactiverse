import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_ITEMS = [
  {
    id: "m1",
    title: "Veg Burger",
    price: "11.99",
    description:
      "Fried potato patty in a bun with lettuce, onion, Cucumber, tomato and house made sauces.",
  },
  {
    id: "m2",
    title: "Spring Rolls",
    price: "8.99",
    description:
      "Noodles and Vegetables wrapped in a phyllo sheet, deep fried come on a bed of crispy noodles salad.    ",
  },
  {
    id: "m3",
    title: "Dahi Poori",
    price: "7.99",
    description:
      "Round hollow poori fried and filled with a mixture of Sweet Yogurt, Sev, Tamarind sauce, Potatoes, Chillies, Chat Masala, and onions.",
  },
  {
    id: "m4",
    title: "Steamed Paneer Momos",
    price: "11.99",
    description:
      "8 Pcs of Steam Cooked Dumplings made with Paneer Stuffing and Wrapped in a house-made dough.",
  },
  {
    id: "m5",
    title: "White Sauce Pasta",
    price: "11.99",
    description: "Boiled Pasta Cooked with Vegetables in Rich Creamy Sauce.",
  },
];

const Products = () => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      {DUMMY_ITEMS.map((item) => (
        <ul key={item.id}>
          <ProductItem
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        </ul>
      ))}
    </section>
  );
};

export default Products;
