import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { firebaseAdmin } from '../config/firebaseAdmin';

export const secureRoute = async (context: GetServerSidePropsContext) => {
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