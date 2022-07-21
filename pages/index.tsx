import React from 'react';
import { PageWithLayout } from '../types/PageWithLayout';
import { getBaseLayout } from '../layout/BaseLayout';
import { MovieGrid } from '../components/movies/MovieGrid';
import { GetServerSideProps } from 'next';
import { secureRoute } from '../router/secureRoute';


export const Home: PageWithLayout = () => {
	return (
		<React.Fragment>
			<MovieGrid />
		</React.Fragment>
	);
};

Home.getLayout = getBaseLayout;

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
	return await secureRoute(context);
};