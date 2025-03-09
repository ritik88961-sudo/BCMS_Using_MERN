import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Token/validateToken"; // validateToken में tokenSlice का default export
import  pageSlice  from "./mainPage";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    page:pageSlice
  },
});

export default store;