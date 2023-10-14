import { createStore } from "redux";

const reducerFunction = (state = { counter: 1 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  } else if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  } else if (action.type === "incrementby") {
    return {
      counter: state.counter + action.amount,
    };
  }

  return state;
};

const store = createStore(reducerFunction);

export default store;
