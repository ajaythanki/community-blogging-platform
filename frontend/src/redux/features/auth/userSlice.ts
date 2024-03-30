import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../../types";



const initialState:TUser = {
  userData: {
    id: "",
    email: "",
    username:"",
    avatar:"",
  },
  isAuthenticated: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state:TUser, action:PayloadAction<TUser>) => {
      state.userData = action.payload.userData;
      state.isAuthenticated = action.payload.isAuthenticated ? true : false;
    },
    clearUser: (state:TUser) => {
      state.userData = {
        id: "",
        email: "",
        avatar: "",
        username: "",
      };
      window.localStorage.removeItem("authUser");
    },
  },
});

export default userSlice.reducer;

export const { setUser, clearUser } = userSlice.actions;
