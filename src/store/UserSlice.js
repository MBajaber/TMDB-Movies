import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: null
}

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserInfo: (state, action) => ({...state, userInfo: action.payload}),
    }
});

export const { getUserInfo } = user.actions;

export default user.reducer;