import { Container } from '@mui/material';
import Head from 'next/head';
import React from 'react';

interface AuthLayoutProps { children: React.ReactNode; }

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
	return (
		<React.Fragment>
			<Head>
				<title>Movie Next App</title>
				<meta name="description" content="Movie Next App" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container maxWidth="xl">
				{children}
			</Container>
		</React.Fragment>
	);
};

export const getAuthLayout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>;