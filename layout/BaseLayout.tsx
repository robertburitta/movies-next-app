import Head from 'next/head';
import React from 'react';
import { Navbar } from '../components/Navbar';
import { Container } from '@mui/material';

interface BaseLayoutProps { children: React.ReactNode; }

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
	return (
		<React.Fragment>
			<Head>
				<title>Movie Next App</title>
				<meta name="description" content="Movie Next App" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<Container maxWidth='xl'>
				{children}
			</Container>
		</React.Fragment>
	);
};

export const getBaseLayout = (page: React.ReactNode) => <BaseLayout>{page}</BaseLayout>;