import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { MovieType } from '../types/MovieType';

interface InitialStateType {
	movies: MovieType[];
	currentPage: number;
	limit: number;
}

export const moviesSlice = createSlice({
	name: 'movies',
	initialState: {
		movies: [],
		currentPage: 1,
		limit: 10
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
		setFavourite(state: InitialStateType, action: PayloadAction<MovieType>) {
			if (action.payload.favourite) {
				console.log(1);
			} else {
				state.movies.sort((a, b) => a.id === action.payload.id ? -1 : 1);
			}

			state.movies.map((movie) => movie.id === action.payload.id ? movie.favourite = !movie.favourite : movie);
		},
		setCurrentPage(state: InitialStateType, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		}
	}
});

export const moviesActions = moviesSlice.actions;
export default moviesSlice;