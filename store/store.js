import { configureStore } from "@reduxjs/toolkit";

import userInfoReducer from "./userInfo";
import itemReducer from "./item";
import groupInfoReducer from "./group";

export default configureStore({
    reducer: {
        userInfo: userInfoReducer,
        item: itemReducer,
        group: groupInfoReducer,
    },
});
