import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store';
import { PageWithLayout } from '../types/PageWithLayout';
import { QueryClient, QueryClientProvider, } from 'react-query';

import '../styles/global.scss';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
	const getLayout = (Component as PageWithLayout).getLayout || ((page) => page);

	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				{getLayout(<Component {...pageProps} />)}
			</Provider>
		</QueryClientProvider>
	);
}