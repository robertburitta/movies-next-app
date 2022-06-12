import React from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { Routes } from '../router/Routes';

export const Navbar = () => {
	return (
		<AppBar position='relative'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Typography variant='h5'>Movie App</Typography>
					<Link href={Routes.HOME}>Home</Link>
					<Link href={Routes.SEARCH}>Search</Link>
				</Toolbar>
			</Container>
		</AppBar>
	);
};