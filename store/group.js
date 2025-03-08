import { createSlice } from "@reduxjs/toolkit";

export const groupInfoSlice = createSlice({
    name: "groupInfo",
    initialState: {
        name: null,
        description: null,
        location: null,
        rules: null,
        numberOfMem: null,
        avatar: null,
        ambassadorId: null,
        status: null,
    },
    reducers: {
        setGroupInfo: (state, action) => {
            state.name = action.payload.name;
            state.description = action.payload.description;
            state.location = action.payload.location;
            state.rules = action.payload.rules;
            state.numberOfMem = action.payload.numberOfMem;
            state.avatar = action.payload.avatar;
            state.ambassadorId = action.payload.ambassadorId;
            state.status = action.payload.status;
        },
        updateName: (state, action) => {
            state.name = action.payload;
        },
        updateDescription: (state, action) => {
            state.description = action.payload;
        },
        updateLocation: (state, action) => {
            state.location = action.payload;
        },
        updateRules: (state, action) => {
            state.rules = action.payload;
        },
        updateNumberOfMem: (state, action) => {
            state.numberOfMem = action.payload;
        },
        updateAvatar: (state, action) => {
            state.avatar = action.payload;
        },
        updateAmbassadorId: (state, action) => {
            state.ambassadorId = action.payload;
        },
        updateStatus: (state, action) => {
            state.status = action.payload;
        },
    }
});

export const {
    setGroupInfo,
    updateAmbassadorId,
    updateAvatar,
    updateDescription,
    updateName,
    updateLocation,
    updateNumberOfMem,
    updateRules,
    updateStatus
} = groupInfoSlice.actions;

export default groupInfoSlice.reducer;

