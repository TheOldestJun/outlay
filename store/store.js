import { configureStore } from "@reduxjs/toolkit";
import loginReducers from "./loginSlice";

const store = configureStore({
  reducer: {
    login: loginReducers,
  },
});

export default store;
