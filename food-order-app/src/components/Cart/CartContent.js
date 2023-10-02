import React, { useContext } from "react";

import Modal from "../UI/Modal/Modal";

import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import cartContext from "../../store/cart-context";

const CartContent = (props) => {
  const ctx = useContext(cartContext);

  console.log(...ctx.items);

  const addItemHandler = (item) => {
    //Resetting quantity to one
    const newItem = {
      ...item,
      amount: 1,
    };
    ctx.addItem(newItem);
  };

  const removeItemHandler = (item) => {
    ctx.removeItem(item);
  };

  return (
    <Modal reset={props.onClose}>
      {ctx.items.map((item) => (
        <CartItem
          item={item}
          key={item.id}
          name={item.name}
          price={item.price}
          label={item.amount}
          addition={addItemHandler}
          onRemove={removeItemHandler}
        />
      ))}
      <CartTotal onClose={props.onClose} />
    </Modal>
  );
};

export default CartContent;
