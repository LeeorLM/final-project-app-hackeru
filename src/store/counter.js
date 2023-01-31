import { createSlice } from "@reduxjs/toolkit";

// create variable that we want redux to store for us
const initalCounterState = {
  counter: 0,
};

/*
    this is a redux toolkit pattern to create the store for redux it self
    redux toolkit also create reducres/actions to manipulate the state.
*/
const counterSlice = createSlice({
  //for redux use
  name: "counter",
  //initial state
  initialState: initalCounterState,
  //functions to munipuldate the state
  //the functions inside the reducers called actions.
  reducers: {
    //we will call this function when use logged in
    //to update the loggedIn state
    counter(state) {
      state.counter++;
    },
    addNumber(state, action) {
      state.counter += +action.payload;
    },
  },
});

//export the actions so we can use them from other components/pages
//to update the state
export const counterActions = counterSlice.actions;

//export the configuration/state/actions to the index.js of redux
//so redux can configure the state
export default counterSlice.reducer;
