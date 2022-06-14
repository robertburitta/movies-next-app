import React from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { MovieType } from '../../types/MovieType';
import { SearchItem } from './SearchItem';

export const SearchList = () => {
	const result: MovieType[] = useSelector((state: RootState) => state.search.result);

	return (
		<Grid container spacing={2} mt={2} mb={4}>
			{result.map((movie) =>
				<Grid item xs={12} lg={6} key={movie.id}>
					<SearchItem movie={movie} />
				</Grid>
			)}
		</Grid>
	);
};