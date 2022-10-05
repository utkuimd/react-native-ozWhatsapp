import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        updateUser: (state, action) => {
            return {
                user: { ...state.user, ...action.payload }
            }
        },
        logout : (state) => {
            state.user = null;
        }
    },
});

export const { updateUser } = userSlice.actions;
export const { logout } = userSlice.actions;