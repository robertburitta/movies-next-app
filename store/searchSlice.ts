import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieType } from '../types/MovieType';

interface InitialStateType {
	result: MovieType[];
}

export const searchSlice = createSlice({
	name: 'search',
	initialState: {
		result: [],
	},
	reducers: {
		setSearchResult(state: InitialStateType, action: PayloadAction<MovieType[]>) {
			state.result = action.payload;
		},
		clearSearchResult(state: InitialStateType) {
			state.result = [];
		}
	}
});

export const searchActions = searchSlice.actions;
export default searchSlice;