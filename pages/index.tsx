import React, { useEffect } from 'react';
import { getBaseLayout } from '../layout/BaseLayout';
import { useMovies } from '../hooks/useMovies';
import { MovieGrid } from '../components/movies/MovieGrid';
import { PageWithLayout } from '../types/PageWithLayout';
import { CircularProgress } from '@mui/material';

export const Home: PageWithLayout = () => {
	const { getMoviesPending, getMovies } = useMovies();

	useEffect(() => {
		getMovies();
	}, []);

	return (
		<React.Fragment>
			{getMoviesPending ?
				<CircularProgress sx={{ display: 'block', margin: '20px auto 0' }} />
				:
				<MovieGrid />
			}
		</React.Fragment>
	);
};

Home.getLayout = getBaseLayout;

export default Home;