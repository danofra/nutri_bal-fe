import { combineReducers, configureStore } from "@reduxjs/toolkit";
import foodItem from "../reducers/foodItem";

const globalReducers = combineReducers({
  favorites: foodItem,
});

const store = configureStore({
  reducer: globalReducers,
});

export default store;
