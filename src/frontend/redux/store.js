import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./reducers/productReducer";

export const store = configureStore({
reducer: {
items: itemReducer,
},
});