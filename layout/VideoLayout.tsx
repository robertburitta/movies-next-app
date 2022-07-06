import Head from 'next/head';
import React from 'react';

interface VideoLayoutProps { children: React.ReactNode; }

const VideoLayout: React.FC<VideoLayoutProps> = ({ children }) => {
	return (
		<React.Fragment>
			<Head>
				<title>Movie Next App</title>
				<meta name="description" content="Movie Next App" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{children}
		</React.Fragment>
	);
};

export const getVideoLayout = (page: React.ReactNode) => <VideoLayout>{page}</VideoLayout>;