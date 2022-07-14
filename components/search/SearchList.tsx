import React, { useState } from 'react';
import { CircularProgress, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { SearchItem } from './SearchItem';
import { AlertDialog } from '../AlertDialog';
import { ErrorType } from '../../types/ErrorType';
import { useFetchSearch } from '../../hooks/useFetchSearch';

export const SearchList = () => {
	const [query, setQuery] = useState<string>('');
	const [error, setError] = useState({} as ErrorType);

	const { result, isLoading, isError } = useFetchSearch({
		onSuccess: () => {
			setError({} as ErrorType);
		},
		onError: (error) => {
			setError(error as ErrorType);
		},
		query
	});

	const handleChange = (query: string) => {
		if (query.length >= 3) {
			setQuery(query);
		} else {
			setQuery('');
		}
	};

	return (
		<React.Fragment>
			<FormControl sx={{ mt: '20px' }}>
				<InputLabel htmlFor='searchInput'>Search movie</InputLabel>
				<OutlinedInput id='searchInput' label='Search movie' sx={{ width: 287 }} onChange={(e) => handleChange(e.target.value)}
					endAdornment={
						<InputAdornment position="end">
							{isLoading && <CircularProgress size={30} />}
						</InputAdornment>
					}
				/>
			</FormControl>
			<Grid container spacing={2} mt={2} mb={4}>
				{result?.map((movie) =>
					<Grid item xs={12} lg={6} key={movie.id}>
						<SearchItem movie={movie} />
					</Grid>
				)}
			</Grid>
			{isError && <AlertDialog error={error} setError={setError} />}
		</React.Fragment>
	);
};