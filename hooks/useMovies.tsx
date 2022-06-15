import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMediaList } from '../pages/api/api';
import { RootState } from '../store';
import { moviesActions } from '../store/moviesSlice';
import { MovieType } from '../types/MovieType';

export const useMovies = () => {
	const dispatch = useDispatch();
	const { currentPage, limit } = useSelector((state: RootState) => state.movies);
	const [getMoviesPending, setGetMoviesPending] = useState(false);
	const [loadMorePending, setLoadMorePending] = useState(false);
	const [fetchedAllFilms, setFetchedAllFilms] = useState(false);
	const [isError, setIsError] = useState(false);

	const getMovies = async () => {
		setGetMoviesPending(true);

		try {
			const movies = await fetchMediaList(limit, currentPage) as MovieType[];

			dispatch(moviesActions.saveMovies(movies));

			setGetMoviesPending(false);
			setIsError(false);
		} catch (err) {
			console.error((err as Error).message);

			if ((err as Error).message === 'Fetched all films') {
				setFetchedAllFilms(true);
				// info dialog - fetched all films
			} else {
				// dialog - network error, try again
			}

			setGetMoviesPending(false);
			setIsError(true);
		}
	};

	const handleLoadMore = async () => {
		setLoadMorePending(true);

		try {
			const moreMovies = await fetchMediaList(limit, currentPage + 1) as MovieType[];

			dispatch(moviesActions.loadMoreMovies(moreMovies));
			dispatch(moviesActions.setCurrentPage(currentPage + 1));

			setLoadMorePending(false);
			setIsError(false);
		} catch (err) {
			console.error((err as Error).message);

			if ((err as Error).message === 'Fetched all films') {
				setFetchedAllFilms(true);
				// info dialog - fetched all films
			} else {
				// dialog - network error, try again
			}

			setLoadMorePending(false);
			setIsError(true);
		}
	};

	return {
		isError,
		getMoviesPending,
		getMovies,
		loadMorePending,
		handleLoadMore,
		fetchedAllFilms
	};
};