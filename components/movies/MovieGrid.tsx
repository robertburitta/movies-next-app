import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Grid } from '@mui/material';
import { MovieCard } from './MovieCard';
import { MovieType } from '../../types/MovieType';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useMovies } from '../../hooks/useMovies';
import { AlertDialog } from '../AlertDialog';
import { ErrorType } from '../../types/ErrorType';
import { useFetchMovies } from "../../hooks/useFetchMovies";

export const MovieGrid = () => {
	// const movies: MovieType[] = useSelector((state: RootState) => state.movies.movies);
	const [error, setError] = useState({} as ErrorType);

	const { getMoviesPending, getMovies, loadMorePending, handleLoadMore, fetchedAllFilms } = useMovies({
		onSuccess: () => {
			setError({} as ErrorType);
		},
		onError: (error) => {
			setError(error);
		}
	});

	const { movies, loadMore } = useFetchMovies({ onSuccess: () => { }, onError: (error) => { } });

	useEffect(() => {
		getMovies();
	}, []);

	return (
		<React.Fragment>
			{getMoviesPending ?
				<CircularProgress sx={{ display: 'block', margin: '20px auto 0' }} />
				:
				<React.Fragment>
					{/* {data.length > 0 && */}
					<Grid container spacing={2} mt={2} mb={4}>
						{movies?.map((movie) =>
							<Grid item xs={12} lg={6} key={movie.id}>
								<MovieCard movie={movie} />
							</Grid>
						)}

						{!fetchedAllFilms &&
							<Button variant='contained' sx={{ margin: '20px auto 0' }} onClick={loadMore} disabled={loadMorePending}>
								{loadMorePending ? <CircularProgress color='inherit' size={25} /> : 'Load more...'}
							</Button>
						}
					</Grid>
					{/* } */}
					{Object.keys(error).length !== 0 && <AlertDialog error={error} />}
				</React.Fragment>
			}
		</React.Fragment>
	);
};