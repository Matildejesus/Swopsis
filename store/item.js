import { createSlice } from "@reduxjs/toolkit";

export const itemSlice = createSlice({
    name: "item",
    initialState: {
        userId: null,
        category: null,
        image: null,
        title: null,
        description: null,
        method: null,
        available: null,
    },
    reducers: {
        setItem: (state, action) => {
            state.userId = action.payload.userId;
            state.category = action.payload.category;
            state.image = action.payload.image;
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.method = action.payload.method;
            state.available = action.payload.available;
        },
        updateCategory: (state, action) => {
            state.category = action.payload;
        },
        updateUserId: (state, action) => {
            state.userId = action.payload;
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
    },
});

// Action creators are generated for each case reducer function
export const {
    setItem,
    updateCategory,
    updateAvailable,
    updateDescription,
    updateMethod,
    updateTitle,
    updateUserId,
    updateImage,
} = itemSlice.actions;

export default itemSlice.reducer;
