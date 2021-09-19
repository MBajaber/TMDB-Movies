import { createSlice, current } from '@reduxjs/toolkit';
import { saveDataToLocalStorage } from '../LocalStorageFunctons';

const initialState = {
    allData: {},
    movies: [],
    mainMovie: null,
    mainPageNumber: 1,
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
        getAllMovies: (state, action) => ({...state, allData: action.payload.data, movies: action.payload.data.results}),
        // pageHandler: (state, action) => ({...state, mainPageNumber: action.payload.pageNumber}),
        changeMainPage: (state, action) => {
            console.log(action.payload)
            return {...state}
        },
        getMainMovie: (state) => {
            let randomNumber = Math.ceil(Math.random() * current(state.allData.results).length);
            return {...state, mainMovie: current(state.allData.results)[randomNumber - 1]}
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

export const { getAllMovies, getData, pageHandler, getMainMovie, getMovieId, peopleIdFunc, keyWordFunc, genreFunc, addToFavoriteList, removeFromFavoriteList, bringDataFromLocalstorage } = movies.actions;

export default movies.reducer;