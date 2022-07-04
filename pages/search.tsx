import React, { useState } from 'react';
import { PageWithLayout } from '../types/PageWithLayout';
import { getBaseLayout } from '../layout/BaseLayout';
import { SearchList } from '../components/search/SearchList';
import { SearchInput } from '../components/search/SearchInput';
import { useFetchSearch } from '../hooks/useFetchSearch';
import { ErrorType } from '../types/ErrorType';

export const Search: PageWithLayout = () => {
	const [query, setQuery] = useState<string>('');
	const [error, setError] = useState({} as ErrorType);

	const { result, isLoading } = useFetchSearch({
		onSuccess: () => {
			setError({} as ErrorType);
		},
		onError: (error) => {
			setError(error);
		},
		query
	});

	return (
		<React.Fragment>
			<SearchInput setQuery={setQuery} isLoading={isLoading} error={error} />
			<SearchList result={result} />
		</React.Fragment>
	);
};

Search.getLayout = getBaseLayout;

export default Search;