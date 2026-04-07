import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth/auth.slice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})