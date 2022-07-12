import React from 'react';
import { PageWithLayout } from '../types/PageWithLayout';
import { getAuthLayout } from '../layout/AuthLayout';
import { FormControlProvider as FormControl } from '../components/FormControl/useFormControl';
import { FormLabel } from '../components/FormControl/FormLabel';
import { FormError } from '../components/FormControl/FormError';
import { Input } from '../components/input/Input';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/userSlice';
import { useRouter } from 'next/router';
import { Button, CircularProgress, Stack } from '@mui/material';

export const Login: PageWithLayout = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const { isPending, form: { register, handleLogin, formState: { errors } } } = useAuth({
		onSuccess: (user) => {
			router.push('/');
			toast.success(`Welcome ${user?.firstName}`);

			if (user) {
				dispatch(userActions.loginUser(user));
			}
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
		</Stack>
	);
};

Login.getLayout = getAuthLayout;

export default Login;