import React from "react";

import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
  const saved = (enteredData) => {
    const expenseData = {
      ...enteredData,
      id: Math.random().toString(),
    };

    props.onSave(expenseData);
  };

  return (
    <div className="new-expense">
      <ExpenseForm onSave={saved} />
    </div>
  );
};

export default NewExpense;
