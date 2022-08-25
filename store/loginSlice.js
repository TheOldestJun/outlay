import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  login: false,
  user: "",
  role: "",
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
    setRole(state, payload) {
      state.role = payload;
    },
  },
});

export const { setLogin, setLogout, setUser, setRole } = loginSlice.actions;
export default loginSlice.reducer;
