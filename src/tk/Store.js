
// import { combineReducers } from "@reduxjs/toolkit";
// import { configureStore } from '@reduxjs/toolkit';
// import { loadState, saveState } from '../utils/local';
// import Reducer from "./Reducer";
// const persistedState = loadState();
// const Reducers = combineReducers({
//   data: Reducer,
//   preloadedState: persistedState 
// });



// const store = configureStore({
//   reducer: Reducers,
//   preloadedState: persistedState,
// });

// store.subscribe(() => {
//   saveState(store.getState());
// });

// export { store };

// // export const store = configureStore({
// //   reducer:Reducers,
// // })


import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "../utils/local";
import Reducer from "./Reducer";

// Load the persisted state from local storage
const persistedState = loadState();

// Combine your reducers
const rootReducer = combineReducers({
  data: Reducer,
  // You don't need to include `preloadedState` as a key here
});

// Configure the store, using the `preloadedState` option to set the initial state
const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState, // Apply persisted state as the initial state
});

// Save the state to local storage whenever it changes
store.subscribe(() => {
  saveState(store.getState());
});

export { store };


