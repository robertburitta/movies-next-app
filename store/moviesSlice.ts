import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MediaList } from '../pages/api/api';

interface InitialStateType {
	movies: MediaList[];
}

export const moviesSlice = createSlice({
	name: 'movies',
	initialState: {
		movies: []
	},
	reducers: {
		saveMovies(state: InitialStateType, action: PayloadAction<MediaList[]>) {
			state.movies = action.payload;
		},
		loadMoreMovies(state: InitialStateType, action: PayloadAction<MediaList[]>) {
			state.movies = [...state.movies, ...action.payload];
		}
	}
});

export const moviesActions = moviesSlice.actions;
export default moviesSlice;