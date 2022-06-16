import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchMedia } from '../pages/api/api';
import { searchActions } from '../store/searchSlice';
import { MovieType } from '../types/MovieType';
import { ResultHandler } from '../types/ResultHandler';

export const useSearch = ({ onSuccess, onError }: ResultHandler) => {
	const dispatch = useDispatch();
	const [isPending, setIsPending] = useState(false);

	const handleSearch = async (query: string) => {
		setIsPending(true);

		try {
			const result = await searchMedia(query) as MovieType[];

			dispatch(searchActions.setSearchResult(result));

			onSuccess();
			setIsPending(false);
		} catch (err) {
			console.error((err as Error).message);

			onError({
				tryAgain: true,
				title: 'Network error',
				message: 'An error occurred while fetching movies. Please try again.',
				callback: () => handleSearch(query)
			});

			setIsPending(false);
		}
	};

	return {
		isPending,
		handleSearch
	};
};