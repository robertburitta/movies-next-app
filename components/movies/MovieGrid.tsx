import React from 'react';
import { Button, CircularProgress, Grid } from '@mui/material';
import { MovieCard } from './MovieCard';
import { MovieType } from '../../types/MovieType';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useMovies } from '../../hooks/useMovies';

export const MovieGrid = () => {
	const { loadMorePending, handleLoadMore } = useMovies();
	const movies: MovieType[] = useSelector((state: RootState) => state.movies.movies);

	return (
		<Grid container spacing={2} mt={2} mb={4}>
			{movies.map((movie) =>
				<Grid item xs={12} lg={6} key={movie.id}>
					<MovieCard movie={movie} />
				</Grid>
			)}
			<Button variant='contained' sx={{ margin: '20px auto 0' }} onClick={handleLoadMore} disabled={loadMorePending}>
				{loadMorePending ? <CircularProgress color='inherit' size={25} /> : 'Load more...'}
			</Button>
		</Grid >
	);
};