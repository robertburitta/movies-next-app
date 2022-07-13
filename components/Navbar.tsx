import React from 'react';
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { Routes } from '../router/Routes';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export const Navbar = () => {
	const router = useRouter();

	const { handleLogout } = useAuth({
		onSuccess: () => {
			router.push('/login');
			toast.success('Successfully logged out!');
		},
		onError: (err) => {
			toast.error(`${err}`);
		}
	});

	return (
		<AppBar position='relative'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Typography variant='h6'>Movie App</Typography>
					<Link href={Routes.HOME}>Home</Link>
					<Link href={Routes.SEARCH}>Search</Link>
					<Button color="error" variant="contained" onClick={handleLogout} sx={{ ml: 'auto' }}>Logout</Button>
				</Toolbar>
			</Container>
		</AppBar>
	);
};