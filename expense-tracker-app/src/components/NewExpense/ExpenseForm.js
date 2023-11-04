import React, { useState } from "react";

import "./ExpenseForm.css";

const ExpenseForm = () => {
  // const [titleEntered, setEnteredTitle] = useState("");
  // const [amountEntered, setEnteredAmount] = useState("");
  // const [dateEntered, setEnteredDate] = useState("");
  const [userInput, setUserInput] = useState({
    titleEntered: "",
    amountEntered: "",
    dateEntered: "",
  });

  // const titleChangeHandler = (event) => {
  //   setEnteredTitle(event.target.value);
  //   // setUserInput({
  //   //   ...userInput,
  //   //   titleEntered: event.target.value,
  //   // });
  //   // setUserInput((prevState) => {
  //   //   return { ...prevState, titleEntered: event.target.value };
  //   // });
  // };

  // const amountChangeHandler = (event) => {
  //   setEnteredAmount(event.target.value);
  //   // setUserInput({
  //   //   ...userInput,
  //   //   amountEntered: event.target.value,
  //   // });
  // };

  // const dateChangeHandler = (event) => {
  //   setEnteredDate(event.target.value);
  //   // setUserInput({
  //   //   ...userInput,
  //   //   dateEntered: event.target.value,
  //   // });
  // };

  const inputChangeHandler = (identifier, value) => {
    if (identifier === "title") {
      setUserInput((prevState) => {
        return { ...prevState, titleEntered: value };
      });
    } else if (identifier === "date") {
      setUserInput((prevState) => {
        return { ...prevState, dateEntered: value };
      });
    } else if (identifier === "amount") {
      setUserInput((prevState) => {
        return { ...prevState, amountEntered: value };
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: userInput.titleEntered,
      amount: userInput.amountEntered,
      date: new Date(userInput.dateEntered),
    };

    console.log(expenseData);
    // Resetting the values for next use;
    setUserInput((prevState) => {
      return { titleEntered: "", dateEntered: "", amountEntered: "" };
    }); // setEnteredTitle("");
    // setEnteredAmount("");
    // setEnteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={userInput.titleEntered}
            onChange={(event) =>
              inputChangeHandler("title", event.target.value)
            }
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={userInput.amountEntered}
            onChange={(event) =>
              inputChangeHandler("amount", event.target.value)
            }
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={userInput.dateEntered}
            onChange={(event) => inputChangeHandler("date", event.target.value)}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
