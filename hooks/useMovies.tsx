import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMediaList } from '../pages/api/api';
import { moviesActions } from '../store/moviesSlice';

export const useMovies = () => {
	const dispatch = useDispatch();
	const [isPending, setIsPending] = useState(false);
	const [isError, setIsError] = useState(false);

	const getMovies = async (limit: number = 10, page: number = 1) => {
		setIsPending(true);

		try {
			const movies = await fetchMediaList(limit, page);

			dispatch(moviesActions.saveMovies(movies));
			setIsPending(false);
			setIsError(false);
		} catch (err) {
			console.error('Network error');
			setIsPending(false);
			setIsError(true);
		}
	};

	return {
		isPending,
		isError,
		getMovies
	};
};