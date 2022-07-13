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

export const Register: PageWithLayout = () => {
	const router = useRouter();

	const { isPending, form: { register, handleRegister, formState: { errors } } } = useAuth({
		onSuccess: () => {
			router.push('/');
			toast.success('Successfully registered!');
		},
		onError: (err) => {
			toast.error(`${err}`);
		}
	});

	return (
		<Stack direction="column" alignItems="center" sx={{ mt: 15 }}>
			<FormControl isRequired isInvalid={!!errors.firstName}>
				<FormLabel>First name</FormLabel>
				<Input {...register('firstName')} />
				<FormError>{errors?.firstName?.message}</FormError>
			</FormControl>
			<FormControl isRequired isInvalid={!!errors.lastName}>
				<FormLabel>Last name</FormLabel>
				<Input {...register('lastName')} />
				<FormError>{errors?.lastName?.message}</FormError>
			</FormControl>
			<FormControl isRequired isInvalid={!!errors.email}>
				<FormLabel>Email</FormLabel>
				<Input type="email" {...register('email')} />
				<FormError>{errors?.email?.message}</FormError>
			</FormControl>
			<FormControl isRequired isInvalid={!!errors.password}>
				<FormLabel>Password</FormLabel>
				<Input type="password" {...register('password')} />
				<FormError>{errors?.password?.message}</FormError>
			</FormControl>
			<FormControl isRequired isInvalid={!!errors.confirm}>
				<FormLabel>Password</FormLabel>
				<Input type="password" {...register('confirm')} />
				<FormError>{errors?.confirm?.message}</FormError>
			</FormControl>
			<Button variant="contained" color="success" size="large" onClick={handleRegister} disabled={isPending} sx={{ width: 120 }}>
				{isPending ? <CircularProgress color="inherit" size={26} /> : 'Register'}
			</Button>
			<Link href={Routes.LOGIN}>
				<a className="auth">Already have account? Login</a>
			</Link>
		</Stack>
	);
};

Register.getLayout = getAuthLayout;

export default Register;