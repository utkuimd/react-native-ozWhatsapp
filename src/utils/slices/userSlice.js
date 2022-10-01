import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
    },
    reducers: {
        updateUser: (state, action) => {
            return {
                user: { ...state.user, ...action.payload }
            }
        },
    },
});

export const { updateUser } = userSlice.actions;