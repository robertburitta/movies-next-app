import { useQuery } from 'react-query';
import { searchMedia } from '../pages/api/api';
import { ErrorType } from '../types/ErrorType';
import { ResultHandler } from '../types/ResultHandler';

interface UseFetchSearchProps extends ResultHandler {
	query: string;
}

export const useFetchSearch = ({ onSuccess, onError, query }: UseFetchSearchProps) => {
	const { data, isLoading } = useQuery(["search", query], () => searchMedia(query), {
		onSuccess: () => {
			onSuccess();
		},
		onError: (err) => {
			onError(err as ErrorType);
		}
	});

	return {
		result: data,
		isLoading
	};
};