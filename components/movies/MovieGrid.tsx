import React from 'react';
import { CircularProgress, Grid } from '@mui/material';
import { MovieCard } from './MovieCard';
import { MediaList } from '../../pages/api/api';

interface MovieGridProps {
	movies: MediaList[];
	isPending: boolean;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ movies, isPending }) => {
	return (
		<Grid container spacing={2} mt={2} mb={4}>
			{isPending ?
				<CircularProgress />
				:
				movies.map((movie) =>
					<Grid item xs={12} lg={6} key={movie.id}>
						<MovieCard movie={movie} />
					</Grid>
				)
			}
		</Grid>
	);
};