import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './moviesSlice';

const store = configureStore({
	reducer: {
		[moviesSlice.name]: moviesSlice.reducer,
	},
	devTools: true
});

export type RootState = ReturnType<typeof store.getState>;

export default store;