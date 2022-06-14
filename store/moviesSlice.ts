import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { MovieType } from '../types/MovieType';

interface InitialStateType {
	movies: MovieType[];
	currentPage: number;
	limit: number;
	favourites: number[];
}

export const moviesSlice = createSlice({
	name: 'movies',
	initialState: {
		movies: [],
		currentPage: 1,
		limit: 10,
		favourites: []
	},
	reducers: {
		saveMovies(state: InitialStateType, action: PayloadAction<MovieType[]>) {
			state.movies = action.payload;
			state.movies.sort((a, b) => a.title > b.title ? 1 : -1);
		},
		loadMoreMovies(state: InitialStateType, action: PayloadAction<MovieType[]>) {
			state.movies = [...state.movies, ...action.payload];
			state.movies.sort((a, b) => a.title > b.title ? 1 : -1);
		},
		updateFavourites(state: InitialStateType, action: PayloadAction<MovieType>) {
			if (state.favourites.indexOf(action.payload.id) !== -1) {
				state.favourites.splice(state.favourites.indexOf(action.payload.id), 1);
			} else {
				state.movies.sort((a) => a.id === action.payload.id ? -1 : 1);
				state.favourites.push(action.payload.id);
			}
			console.log(action.payload, current(state.favourites));
		},
		setCurrentPage(state: InitialStateType, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		}
	}
});

export const moviesActions = moviesSlice.actions;
export default moviesSlice;