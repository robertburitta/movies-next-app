import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMediaList } from '../pages/api/api';
import { RootState } from '../store';
import { moviesActions } from '../store/moviesSlice';
import { ResultHandler } from '../types/ResultHandler';
import { MovieType } from '../types/MovieType';

export const useMovies = ({ onSuccess, onError }: ResultHandler) => {
	const dispatch = useDispatch();
	const { currentPage, limit } = useSelector((state: RootState) => state.movies);
	const [getMoviesPending, setGetMoviesPending] = useState(false);
	const [loadMorePending, setLoadMorePending] = useState(false);
	const [fetchedAllFilms, setFetchedAllFilms] = useState(false);

	const getMovies = async () => {
		setGetMoviesPending(true);

		try {
			const movies = await fetchMediaList(limit, 1) as MovieType[];

			dispatch(moviesActions.saveMovies(movies));
			dispatch(moviesActions.setCurrentPage(1));

			onSuccess();
			setGetMoviesPending(false);
		} catch (err) {
			console.error((err as Error).message);

			if ((err as Error).message === 'Fetched all films') {
				setFetchedAllFilms(true);

				onError({
					tryAgain: false,
					title: 'Fetched all movies',
					message: 'Already fetched all of our movies.'
				});
			} else {
				onError({
					tryAgain: true,
					title: 'Network error',
					message: 'An error occurred while fetching movies. Please try again.',
					callback: getMovies
				});
			}

			setGetMoviesPending(false);
		}
	};

	const handleLoadMore = async () => {
		setLoadMorePending(true);

		try {
			const moreMovies = await fetchMediaList(limit, currentPage + 1) as MovieType[];

			dispatch(moviesActions.loadMoreMovies(moreMovies));
			dispatch(moviesActions.setCurrentPage(currentPage + 1));

			onSuccess();
			setLoadMorePending(false);
		} catch (err) {
			console.error((err as Error).message);

			if ((err as Error).message === 'Fetched all films') {
				setFetchedAllFilms(true);

				onError({
					tryAgain: false,
					title: 'Fetched all movies',
					message: 'Already fetched all of our movies.'
				});
			} else {
				onError({
					tryAgain: true,
					title: 'Network error',
					message: 'An error occurred while fetching movies. Please try again.',
					callback: handleLoadMore
				});
			}

			setLoadMorePending(false);
		}
	};

	return {
		getMoviesPending,
		getMovies,
		loadMorePending,
		handleLoadMore,
		fetchedAllFilms
	};
};