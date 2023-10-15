import { useState, useEffect } from "react";

import useFetch from "../../hooks/use-fetch";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = () => {
  const [productsItems, setProductItems] = useState(null);
  const [message, setMessage] = useState("Loading...");
  const { result, error, fetchRequest } = useFetch(
    "https://reactiverse-2842e-default-rtdb.firebaseio.com/AromaOfIndia.json"
  );

  const fetchData = async () => {
    try {
      await fetchRequest();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (error) {
      setMessage(error);
      return console.log(error);
    }

    setProductItems(result);
  }, [result, error]);

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      {productsItems === null ? (
        <span>{message}</span>
      ) : (
        <ul>
          {productsItems.map((item) => (
            <ProductItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Products;
