import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Grid } from '@mui/material';
import { MovieCard } from './MovieCard';
import { AlertDialog } from '../AlertDialog';
import { ErrorType } from '../../types/ErrorType';
import { useFetchMovies } from '../../hooks/useFetchMovies';

export const MovieGrid = () => {
	const [error, setError] = useState({} as ErrorType);

	const { movies, loadMore, isLoading } = useFetchMovies({
		onSuccess: () => {
			setError({} as ErrorType);
		},
		onError: (error) => {
			setError(error);
		}
	});

	return (
		<React.Fragment>
			{isLoading && movies.length === 0 ?
				<CircularProgress sx={{ display: 'block', margin: '20px auto 0' }} />
				:
				<React.Fragment>
					{movies.length > 0 &&
						<Grid container spacing={2} mt={2} mb={4}>
							{movies?.map((movie) =>
								<Grid item xs={12} lg={6} key={movie.id}>
									<MovieCard movie={movie} setError={setError} />
								</Grid>
							)}

							<Button variant='contained' sx={{ margin: '20px auto 0' }} onClick={loadMore} disabled={isLoading && movies.length !== 0}>
								{isLoading && movies.length !== 0 ? <CircularProgress color='inherit' size={25} /> : 'Load more...'}
							</Button>
						</Grid>
					}
					{Object.keys(error).length !== 0 && <AlertDialog error={error} setError={setError} />}
				</React.Fragment>
			}
		</React.Fragment>
	);
};