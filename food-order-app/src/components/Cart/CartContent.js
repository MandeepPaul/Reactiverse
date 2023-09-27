import React, { useContext } from "react";

import Modal from "../UI/Modal/Modal";

import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import cartContext from "../../store/cart-context";

const CartContent = (props) => {
  const ctx = useContext(cartContext);

  console.log(`cartList: ${ctx.mealList}`);

  return (
    <Modal reset={props.onClose}>
      {ctx.mealList.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          label={item.amount}
        />
      ))}
      <CartTotal />
    </Modal>
  );
};

export default CartContent;
