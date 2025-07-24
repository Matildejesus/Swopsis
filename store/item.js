import { createSlice } from "@reduxjs/toolkit";

export const itemSlice = createSlice({
    name: "item",
    initialState: {
        userId: null,
        avatar: null,
        email: null,
        category: null,
        image: null,
        title: null,
        description: null,
        method: null,
        available: null,
        tradeCount: 0,
        unavailableDates: null,
        extraInfo: null
    },
    reducers: {
        setItem: (state, action) => {
            state.userId = action.payload.userId;
            state.avatar = action.payload.avatar;
            state.email = action.payload.email;
            state.category = action.payload.category;
            state.image = action.payload.image;
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.method = action.payload.method;
            state.available = action.payload.available;
            state.tradeCount = action.payload.tradeCount;
            state.unavailableDates = action.payload.unavailableDates;
            state.extraInfo = action.payload.extraInfo;
        },
        updateCategory: (state, action) => {
            state.category = action.payload;
        },
        updateUserId: (state, action) => {
            state.userId = action.payload;
        },
        updateAvatar: (state, action) => {
            state.avatar = action.payload.avatar;
        },
        updateEmail: (state, action) => {
            state.email = action.payload.email;
        },
        updateImage: (state, action) => {
            state.image = action.payload;
        },
        updateTitle: (state, action) => {
            state.title = action.payload;
        },
        updateDescription: (state, action) => {
            state.description = action.payload;
        },
        updateMethod: (state, action) => {
            state.method = action.payload;
        },
        updateAvailable: (state, action) => {
            state.available = action.payload;
        },
        updateTradeCount: (state, action) => {
            state.tradeCount = action.payload;
        },
        updateUnavailableDates: (state, action) => {
            state.unavailableDates = action.payload;
        },
        updateExtraInfo: (state, action) => {
            state.extraInfo = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const {
    setItem,
    updateAvatar,
    updateEmail,
    updateCategory,
    updateAvailable,
    updateDescription,
    updateMethod,
    updateTitle,
    updateUserId,
    updateImage,
    updateUnavailableDates,
    updateTradeCount,
    updateExtraInfo
} = itemSlice.actions;

export default itemSlice.reducer;
