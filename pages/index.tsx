import React from 'react';
import { PageWithLayout } from '../types/PageWithLayout';
import { getBaseLayout } from '../layout/BaseLayout';
import { MovieGrid } from '../components/movies/MovieGrid';
import { GetServerSideProps } from 'next';
import { firebaseAdmin } from '../config/firebaseAdmin';
import nookies from 'nookies';

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
	try {
		const cookies = nookies.get(context);
		const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

		return {
			props: { token }
		};
	} catch (err) {
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		};
	}
};