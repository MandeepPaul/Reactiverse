import React, { useState } from "react";

import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
  const [showDialogue, setStatus] = useState(false);

  const clickHandler = () => {
    setStatus(true);
  };

  const close = (decision) => {
    setStatus(decision);
  };

  const saved = (enteredData) => {
    const expenseData = {
      ...enteredData,
      id: Math.random().toString(),
    };

    props.onSave(expenseData);

    setStatus(false); //Hide the form once the form is submitted.
  };

  return (
    <div className="new-expense">
      {showDialogue ? (
        <ExpenseForm onSave={saved} onCancle={close} />
      ) : (
        <button onClick={clickHandler}>AddNewExpense</button>
      )}
    </div>
  );
};

export default NewExpense;
