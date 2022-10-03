// I created this slice for better login - logout process.
import { createSlice } from "@reduxjs/toolkit";

export const authCompSlice = createSlice({
    name: 'authComp',
    initialState: {
        authComp: null,
    },
    reducers : {
        setAuthComp : (state, action) => {
            state.authComp = action.payload;
        },
    },
});

export const { setAuthComp } = authCompSlice.actions;
