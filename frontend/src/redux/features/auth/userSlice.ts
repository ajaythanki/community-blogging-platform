import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TUser = {
  userData:{
    id: "";
    email: "";
  }
};

const initialState:TUser = {
  userData: {
    id: "",
    email: "",
  },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state:TUser, action:PayloadAction<TUser>) => {
      state.userData = action.payload.userData;
      
    },
    clearUser: (state:TUser) => {
      state.userData = {
        id: "",
        email: "",
      };
      window.localStorage.removeItem("authUser");
    },
  },
});

export default userSlice.reducer;

export const { setUser, clearUser } = userSlice.actions;
