import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './movieSlice';
import userSlice from './UserSlice';

export default configureStore({
    reducer: {
        movies: moviesSlice,
        user: userSlice
    }
});