import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './moviesSlice';
import searchSlice from './searchSlice';

const store = configureStore({
	reducer: {
		[moviesSlice.name]: moviesSlice.reducer,
		[searchSlice.name]: searchSlice.reducer,
	},
	devTools: true
});

export type RootState = ReturnType<typeof store.getState>;

export default store;