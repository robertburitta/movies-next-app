import React from 'react';
import { PageWithLayout } from '../types/PageWithLayout';
import { getAuthLayout } from '../layout/AuthLayout';
import { FormControlProvider as FormControl } from '../components/FormControl/useFormControl';
import { FormLabel } from '../components/FormControl/FormLabel';
import { FormError } from '../components/FormControl/FormError';
import { Input } from '../components/input/Input';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Button, CircularProgress, Stack } from '@mui/material';
import Link from 'next/link';
import { Routes } from '../router/Routes';
import GoogleIcon from '@mui/icons-material/Google';

export const Login: PageWithLayout = () => {
	const router = useRouter();

	const { isPending, formLogin: { register, handleLogin, formState: { errors } }, handleGoogleLogin } = useAuth({
		onSuccess: (user) => {
			router.push('/');
			toast.success(`Welcome ${user?.firstName}`);
		},
		onError: (err) => {
			toast.error(`${err}`);
		}
	});

	return (
		<Stack direction="column" alignItems="center" sx={{ mt: 20 }}>
			<FormControl isRequired isInvalid={!!errors.email}>
				<FormLabel>Login</FormLabel>
				<Input {...register('email')} />
				<FormError>{errors?.email?.message}</FormError>
			</FormControl>
			<FormControl isRequired isInvalid={!!errors.password}>
				<FormLabel>Password</FormLabel>
				<Input type="password" {...register('password')} />
				<FormError>{errors?.password?.message}</FormError>
			</FormControl>
			<Button variant="contained" color="success" size="large" onClick={handleLogin} disabled={isPending} sx={{ width: 100 }}>
				{isPending ? <CircularProgress color="inherit" size={26} /> : 'Login'}
			</Button>
			<Link href={Routes.REGISTER}>
				<a className="auth">Dont have an account? Register</a>
			</Link>
			<Button variant="contained" color="primary" size="large" onClick={handleGoogleLogin} endIcon={<GoogleIcon />} disabled={isPending} sx={{ width: 180, mt: 5 }}>
				{isPending ? <CircularProgress color="inherit" size={26} /> : 'Login with'}
			</Button>
		</Stack>
	);
};

Login.getLayout = getAuthLayout;

export default Login;