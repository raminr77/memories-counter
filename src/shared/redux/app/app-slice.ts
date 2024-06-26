import { createSlice } from '@reduxjs/toolkit';
import { REDUCERS } from "shared/constants/reducers";
import { LOCAL_STORAGE_KEYS } from "shared/constants/local-storage-keys";

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
