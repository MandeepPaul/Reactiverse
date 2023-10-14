//Redux is a javascript library that we can use it with any JS project not restricted to React.

const redux = require("redux");

// Defining initial state otherwise redux will not know from where to start counter.
// Reducer should be  pure JS function. It must not send HTTP request/write something to local storage/fetch from local storage.
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }
};

// This is how Redux will know about reducer function.
const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
  //Method provided by createStore
  const latestState = store.getState();
  console.log(latestState);
};

//Redux will know about the subscriber.
store.subscribe(counterSubscriber);

//type should be distinct
store.dispatch({ type: "increment" });
