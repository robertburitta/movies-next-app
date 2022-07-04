import { useQuery } from 'react-query';
import { searchMedia } from '../pages/api/api';
import { ResultHandler } from '../types/ResultHandler';

interface UseFetchSearchProps extends ResultHandler {
	query: string;
}

export const useFetchSearch = ({ onSuccess, onError, query }: UseFetchSearchProps) => {
	const { data, isLoading, isError, refetch } = useQuery(['search', query], () => searchMedia(query), {
		onSuccess: () => {
			onSuccess();
		},
		onError: () => {
			onError({
				tryAgain: true,
				title: 'Network error',
				message: 'An error occurred while fetching movies. Please try again.',
				callback: refetch
			});
		},
		enabled: query.length >= 3
	});

	return {
		result: data,
		isLoading,
		isError
	};
};