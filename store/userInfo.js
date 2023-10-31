import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    userName: null,
    email: null,
    password: null,
    profilePicture: null,
    coins: null,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.coins = 0;
      state.profilePicture = action.payload.profilePicture;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateUserName: (state, action) => {
      state.userName = action.payload;
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
    },
    updatePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
    updateCoins: (state, action) => {
      state.coins = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserInfo,
  updateEmail,
  updateUserName,
  updatePassword,
  updatePicture,
  updateCoins,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
