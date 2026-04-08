import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        response: null,
        loading: false,
        error: null
    },
    reducers: {
        setResponse: (state, action) => {
            state.response = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setResponse, setLoading, setError } = homeSlice.actions;
export default homeSlice.reducer;