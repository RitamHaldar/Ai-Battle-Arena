import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth/auth.slice.js";
import homeReducer from "../Features/Home/home.slice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        home: homeReducer,
    }
})