import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './moviesSlice';
import searchSlice from './searchSlice';
import userSlice from './userSlice';

const store = configureStore({
	reducer: {
		[moviesSlice.name]: moviesSlice.reducer,
		[searchSlice.name]: searchSlice.reducer,
		[userSlice.name]: userSlice.reducer
	},
	devTools: true
});

export type RootState = ReturnType<typeof store.getState>;

export default store;