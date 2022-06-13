import React from 'react';
import { PageWithLayout } from '../types/PageWithLayout';
import { getBaseLayout } from '../layout/BaseLayout';
import { CircularProgress, TextField } from '@mui/material';
import { SearchList } from '../components/search/SearchList';
import { useSearch } from '../hooks/useSearch';
import { searchActions } from '../store/searchSlice';
import { useDispatch } from 'react-redux';

export const Search: PageWithLayout = () => {
	const dispatch = useDispatch();
	const { isPending, handleSearch } = useSearch();

	const handleChange = (query: string) => {
		if (query.length >= 3) {
			handleSearch(query);
		} else {
			dispatch(searchActions.clearSearchResult());
		}
	};

	return (
		<React.Fragment>
			<TextField variant='outlined' label='Search movie...' sx={{ mt: '20px' }} onChange={(e) => handleChange(e.target.value)} />
			{isPending ? <CircularProgress sx={{ display: 'block', margin: '20px auto 0' }} /> : <SearchList />}
		</React.Fragment>
	);
};

Search.getLayout = getBaseLayout;

export default Search;