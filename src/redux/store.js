import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducer/authReducer";

export const store = configureStore({
  reducer: {
    AuthReducer: AuthReducer,

  },
});