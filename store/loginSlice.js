import { createSlice } from "@reduxjs/toolkit";
import { setUseProxies } from "immer";

let initialState = {
  login: false,
  user: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin(state) {
      state.login = true;
    },
    setLogout(state) {
      state.login = false;
      state.name = "";
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
});

export const { setLogin, setLogout, setUser } = loginSlice.actions;
export default loginSlice.reducer;
