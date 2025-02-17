import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: {
        userName: null,
        email: null,
        password: null,
        group: null,
        profilePicture: null,
        coins: null,
        totalWeight: null,
        totalLitres: null,
        totalCarbon: null,
        itemsSwapped: null,
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.userName = action.payload.userName;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.group = action.payload.group;
            state.coins = action.payload.coins;
            state.profilePicture = action.payload.profilePicture;
            state.totalWeight = action.payload.totalWeight;
            state.totalCarbon = action.payload.totalCarbon;
            state.totalLitres = action.payload.totalLitres;
            state.itemsSwapped = action.payload.itemsSwapped;
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
        updateGroup: (state, action) => {
            state.group = action.payload;
        },
        updateCoins: (state, action) => {
            state.coins = action.payload;
        },
        updateLitres: (state, action) => {
            state.totalLitres = action.payload;
        },
        updateCarbon: (state, action) => {
            state.totalCarbon = action.payload;
        },
        updateWeight: (state, action) => {
            state.totalWeight = action.payload;
        },
        updateItemsSwapped: (state, action) => {
            state.itemsSwapped = action.payload;
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
    updateGroup,
    updateCoins,
    updateLitres,
    updateCarbon,
    updateWeight,
    itemsSwapped,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
