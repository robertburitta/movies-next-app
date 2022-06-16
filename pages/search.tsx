import React, { useEffect } from 'react';
import { PageWithLayout } from '../types/PageWithLayout';
import { getBaseLayout } from '../layout/BaseLayout';
import { CircularProgress, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
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

	useEffect(() => {
		dispatch(searchActions.clearSearchResult());
	}, []);

	return (
		<React.Fragment>
			<FormControl sx={{ mt: '20px' }}>
				<InputLabel htmlFor='searchInput'>Search movie</InputLabel>
				<OutlinedInput id='searchInput' label='Search movie' sx={{ width: 300 }} onChange={(e) => handleChange(e.target.value)}
					endAdornment={
						<InputAdornment position="end">
							{isPending && <CircularProgress size={30} />}
						</InputAdornment>
					}
				/>
			</FormControl>
			<SearchList />
		</React.Fragment>
	);
};

Search.getLayout = getBaseLayout;

export default Search;