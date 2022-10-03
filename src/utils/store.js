import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { authCompSlice } from "./slices/authCompSlice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        authComp: authCompSlice.reducer,
    },
});