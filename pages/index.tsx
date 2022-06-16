import React from 'react';
import { PageWithLayout } from '../types/PageWithLayout';
import { getBaseLayout } from '../layout/BaseLayout';
import { MovieGrid } from '../components/movies/MovieGrid';

export const Home: PageWithLayout = () => {
	return (
		<React.Fragment>
			<MovieGrid />
		</React.Fragment>
	);
};

Home.getLayout = getBaseLayout;

export default Home;