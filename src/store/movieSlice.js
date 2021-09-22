import { createSlice } from '@reduxjs/toolkit';
import { saveDataToLocalStorage } from '../LocalStorageFunctons';

const initialState = {
    movieId: '',
    peopleId: '',
    keyword: {},
    genres: {},
    favoriteList: []
}

const movies = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        changeMainPage: (state, action) => {
            console.log(action.payload)
            return {...state}
        },
        getMovieId: (state, action) => ({...state, movieId: action.payload}),
        peopleIdFunc: (state, action) => ({...state, peopleId: action.payload}),
        keyWordFunc: (state, action) => ({...state, keyword: action.payload}),
        genreFunc: (state, action) => ({...state, genres: action.payload}),
        addToFavoriteList: (state, action) => {
            if(state.favoriteList.length === 0 ) {
                saveDataToLocalStorage(state.favoriteList.concat(action.payload));
                return {...state, favoriteList: state.favoriteList.concat(action.payload)}
            } else if(!state.favoriteList.some(el => el.movieData.id === action.payload.movieData.id)) {
                saveDataToLocalStorage(state.favoriteList.concat(action.payload));
                return {...state, favoriteList: state.favoriteList.concat(action.payload)}
            }
        },
        removeFromFavoriteList: (state, action) => {
            if(state.favoriteList.length > 0 && state.favoriteList.some(el => el.movieData.id === action.payload)) {
                let removeItem = state.favoriteList.filter(el => el.movieData.id !== action.payload);
                saveDataToLocalStorage(removeItem);
                return {...state, favoriteList: removeItem}
            }
        },
        bringDataFromLocalstorage: (state, action) => {
            return {...state, favoriteList: action.payload}
        }
    }
});

export const { getMovieId, peopleIdFunc, keyWordFunc, genreFunc, addToFavoriteList, removeFromFavoriteList, bringDataFromLocalstorage } = movies.actions;
export default movies.reducer;