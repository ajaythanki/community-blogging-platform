import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../../types";



const initialState:TUser = {
  user: {
    id: "",
    email: "",
    username:"",
    avatar:"",
  },
  token:"",
  isAuthenticated: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state:TUser, action:PayloadAction<TUser>) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated ? true : false;
    },
    clearUser: (state:TUser) => {
      state.user = {
        id: "",
        email: "",
        avatar: "",
        username: "",
      };
      state.isAuthenticated = false;
      window.localStorage.removeItem("authUser");
    },
  },
});

export default userSlice.reducer;

export const { setUser, clearUser } = userSlice.actions;
