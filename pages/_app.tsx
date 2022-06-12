import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store';
import { PageWithLayout } from '../types/PageWithLayout';

import '../styles/global.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
	const getLayout = (Component as PageWithLayout).getLayout || ((page) => page);

	return (
		<Provider store={store}>
			{getLayout(<Component {...pageProps} />)}
		</Provider>
	);
}