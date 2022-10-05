import { createSlice } from "@reduxjs/toolkit";

export const contactListSlice = createSlice({
    name: 'contactList',
    initialState: {
        contactList: [],
    },
    reducers: {
        setContactList: (state, action) => { // If you don't use "state" parameter, it will not work.
            return {
                contactList: action.payload
            }
        }
    }
})

export const { setContactList } = contactListSlice.actions;
