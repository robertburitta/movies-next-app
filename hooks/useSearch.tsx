import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchMedia } from '../pages/api/api';
import { searchActions } from '../store/searchSlice';
import { MovieType } from '../types/MovieType';

export const useSearch = () => {
	const dispatch = useDispatch();
	const [isPending, setIsPending] = useState(false);
	const [isError, setIsError] = useState(false);

	const handleSearch = async (query: string) => {
		setIsPending(true);

		try {
			const result = await searchMedia(query) as MovieType[];

			dispatch(searchActions.setSearchResult(result));

			setIsPending(false);
			setIsError(false);
		} catch (err) {
			console.error(err);
			setIsPending(false);
			setIsError(true);
		}
	};

	return {
		isError,
		isPending,
		handleSearch
	};
};