import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchMediaList, MediaList } from '../pages/api/api';
import { ResultHandler } from '../types/ResultHandler';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { sort } from '../utils/sort';

interface UseFetchMoviesProps extends ResultHandler {
	items?: number;
}

export const useFetchMovies = ({ onSuccess, onError, items = 10 }: UseFetchMoviesProps) => {
	const [page, setPage] = useState(1);
	const [movies, setMovies] = useState<MediaList[]>([]);
	const favourites = useSelector((state: RootState) => state.movies.favourites);

	useEffect(() => {
		setMovies((prev) => sort(prev, favourites));
	}, [favourites]);

	const { isLoading, isError, refetch } = useQuery(['movies', page, items], () => fetchMediaList(items, page), {
		onSuccess: (data) => {
			onSuccess();
			setMovies(prev => prev ? sort([...prev, ...data], favourites) : sort([...data], favourites));
		},
		onError: (err) => {
			if ((err as Error).message === 'Fetched all films') {
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
					callback: refetch
				});
			}
		}
	});

	const loadMore = () => {
		setPage(prev => prev + 1);
	};

	return {
		movies,
		loadMore,
		isLoading,
		isError
	};
};