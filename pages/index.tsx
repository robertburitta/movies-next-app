import React, { useEffect } from 'react';
import { getBaseLayout } from '../layout/BaseLayout';
import { useMovies } from '../hooks/useMovies';
import { fetchMediaList, MediaList } from './api/api';
import { MovieGrid } from '../components/movies/MovieGrid';
import { GetStaticProps } from 'next';
import { PageWithLayout } from '../types/PageWithLayout';

interface HomeProps {
	movies: MediaList[];
}

export const Home: PageWithLayout<HomeProps> = ({ movies }) => {
	const { isPending, getMovies } = useMovies();

	useEffect(() => {
		getMovies();
	}, []);

	return (
		<React.Fragment>
			<MovieGrid movies={movies} isPending={isPending} />
		</React.Fragment>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const movies = await fetchMediaList(10, 1);

	return {
		props: {
			movies: movies as MediaList[]
		}
	};
};

Home.getLayout = getBaseLayout;

export default Home;