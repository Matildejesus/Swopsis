import { configureStore } from "@reduxjs/toolkit";

import userInfoReducer from "./userInfo";
import itemReducer from "./item";

export default configureStore({
  reducer: {
    userInfo: userInfoReducer,
    item: itemReducer,
  },
});
