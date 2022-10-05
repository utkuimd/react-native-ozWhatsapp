import { createSlice } from "@reduxjs/toolkit";

export const chosenContactSlice = createSlice({
    name: 'chosenContact',
    initialState: {
        chosenContact: {},
    },
    reducers: {
        updateContact: (state, action) => {
            return {
                chosenContact: { ...action.payload }
            }
        }
    }
})

export const { updateContact } = chosenContactSlice.actions;
