import { useQuery } from 'react-query';
import { MediaList, searchMedia } from '../pages/api/api';
import { ResultHandler } from '../types/ResultHandler';

interface UseFetchSearchProps extends ResultHandler<MediaList[]> {
	query: string;
}

export const useFetchSearch = ({ onSuccess, onError, query }: UseFetchSearchProps) => {
	const { data, isLoading, isError, refetch } = useQuery(['search', query], () => searchMedia(query), {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		enabled: query.length >= 3,
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
		}
	});

	return {
		result: data,
		isLoading,
		isError
	};
};