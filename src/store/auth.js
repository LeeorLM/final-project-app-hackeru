import { createSlice } from "@reduxjs/toolkit";

// create variable that we want redux to store for us
const initialAuthState = {
  loggedIn: false,
  userData: {},
};

/*
 *  this is a redux toolkit pattern to create the store for redux itself
 *  redux toolkit also create reducers/actions to mnipulate the state.
 */
const authSlice = createSlice({
  //for redux use
  name: "auth",
  //initial State
  initialState: initialAuthState,
  //function to mnipulate the state
  //the function inside the reducers called actions
  reducers: {
    //we will call this function when user logged in
    //to update the loggedIn State
    login(state) {
      state.loggedIn = true;
    },
    //we will call this function when user logged out
    //to update the loggedIn State
    logout(state) {
      state.loggedIn = false;
      state.userData = {};
    },
    updateUserData(state, action) {
      state.userData = action.payload;
    },
  },
});

//export the actions so we can use them from other components/pages
//to update the state
export const authActions = authSlice.actions;

//export the configuration/state/actions to the index.js of redux
//so redux can configure the state
export default authSlice.reducer;
