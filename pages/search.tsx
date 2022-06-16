import React from 'react';
import { PageWithLayout } from '../types/PageWithLayout';
import { getBaseLayout } from '../layout/BaseLayout';
import { SearchList } from '../components/search/SearchList';
import { SearchInput } from '../components/search/SearchInput';

export const Search: PageWithLayout = () => {
	return (
		<React.Fragment>
			<SearchInput />
			<SearchList />
		</React.Fragment>
	);
};

Search.getLayout = getBaseLayout;

export default Search;