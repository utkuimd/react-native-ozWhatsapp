import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { authCompSlice } from "./slices/authCompSlice";
import { themeSlice } from './slices/themeSlice';
import { contactListSlice } from "./slices/contactListSlice";
import { chosenContactSlice } from "./slices/chosenContactSlice";
import { messagesSlice } from "./slices/messagesSlice";
import { allStatusSlice } from "./slices/allStatus";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        authComp: authCompSlice.reducer,
        theme: themeSlice.reducer,
        contactList: contactListSlice.reducer,
        chosenContact: chosenContactSlice.reducer,
        messages: messagesSlice.reducer,
        allStatus: allStatusSlice.reducer
    },
});