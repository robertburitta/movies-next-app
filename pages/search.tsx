import React from 'react';
import { PageWithLayout } from '../types/PageWithLayout';
import { getBaseLayout } from '../layout/BaseLayout';
import { SearchList } from '../components/search/SearchList';
import { GetServerSideProps } from 'next';
import { secureRoute } from '../router/secureRoute';

export const Search: PageWithLayout = () => {
	return (
		<React.Fragment>
			<SearchList />
		</React.Fragment>
	);
};

Search.getLayout = getBaseLayout;

export default Search;

export const getServerSideProps: GetServerSideProps = async (context) => {
	return await secureRoute(context);
};