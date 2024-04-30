import { combineReducers, configureStore } from "@reduxjs/toolkit";
import foodstorage from "../reducers/foodstorage";

const globalReducers = combineReducers({
  favorites: foodstorage,
});

const store = configureStore({
  reducer: globalReducers,
});

export default store;
