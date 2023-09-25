import React from "react";

import Modal from "../UI/Modal/Modal";

import CartItem from "./CartItem";

const CartContent = (props) => {
  return (
    <Modal reset={props.onClose}>
      <CartItem />
    </Modal>
  );
};

export default CartContent;
