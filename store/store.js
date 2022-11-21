import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import userDataSlice from "./userDataSlice";

const combineReducer = combineReducers({
  userDataSlice,
});

export const makeStore = () =>
  configureStore({
    reducer: combineReducer,
  });

export const wrapper = createWrapper(makeStore);
