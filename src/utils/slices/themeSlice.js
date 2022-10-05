import { createSlice } from '@reduxjs/toolkit';
import lightTheme from '../../constants/light';
import darkTheme from '../../constants/dark';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: lightTheme
    },
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme.type === 'light' ? darkTheme : lightTheme;
        }
    }
})

export const { toggleTheme } = themeSlice.actions;
