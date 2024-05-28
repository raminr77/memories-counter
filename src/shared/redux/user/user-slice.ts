import { createSlice } from '@reduxjs/toolkit';
import { REDUCERS } from "../../constants/reducers";


const initialState: GUser = {
    id: null,
    name: '',
    code: '',
    email: '',
    birthday: '',
    isMale: false,
    isAuthenticated: false
};

const userSlice = createSlice({
    name: REDUCERS.USER,
    initialState,
    reducers: {
        userLoginAction: (_, action) => {
            return {
                isAuthenticated: true,
                ...(action.payload || {})
            };
        },
        userLogoutAction: () => {
            return {
                id: null,
                name: '',
                code: '',
                email: '',
                birthday: '',
                isMale: false,
                isAuthenticated: false
            };
        }
    }
});

export const { userLogoutAction, userLoginAction } = userSlice.actions;

export default userSlice.reducer;
