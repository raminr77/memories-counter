import { createSlice } from '@reduxjs/toolkit';
import { REDUCERS } from "../../constants/reducers.ts";
import { LOCAL_STORAGE_KEYS } from "../../constants/local-storage-keys.ts";

const initialState: GApp = {
    darkMode: !!localStorage.getItem(LOCAL_STORAGE_KEYS.DARK_MODE),
};

const appSlice = createSlice({
    name: REDUCERS.APP,
    initialState,
    reducers: {
        toggleDarkMode: (state, action) => {
            state.darkMode = action.payload || !state.darkMode;
        }
    }
});

export const {
    toggleDarkMode,
} = appSlice.actions;

export default appSlice.reducer;
