import { createSlice } from "@reduxjs/toolkit";

export const allStatusSlice = createSlice({
    name: 'allStatus',
    initialState: {
        allStatus: []
    },
    reducers: {
        setAllStatus: (state, action) => {
            return {
                allStatus: action.payload
            }
        }
    }
})

export const { setAllStatus } = allStatusSlice.actions;
