import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { ResultHandler } from '../types/ResultHandler';
import zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, UserStatus } from '../types/User';
import { auth, db, provider } from '../config/firebase';
import { ref, get, child, set } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/userSlice';
import nookies from 'nookies';

const LoginSchema = zod.object({
	email: zod.string().email().min(1),
	password: zod.string().min(6).max(15)
});

const RegisterSchema = zod.object({
	firstName: zod.string().min(1),
	lastName: zod.string().min(1),
	email: zod.string().email().min(1),
	password: zod.string().min(6).max(15),
	confirm: zod.string().min(6).max(15)
}).refine((data) => data.password === data.confirm, {
	message: "Passwords don't match",
	path: ['confirm']
});

type LoginData = zod.infer<typeof LoginSchema>;
type RegisterData = zod.infer<typeof RegisterSchema>;

export const useAuth = ({ onSuccess, onError }: ResultHandler<User>) => {
	const dispatch = useDispatch();
	const [isPending, setIsPending] = useState(false);
	const { handleSubmit: handleLoginSubmit, ...loginForm } = useForm<LoginData>({ resolver: zodResolver(LoginSchema) });
	const { handleSubmit: handleRegisterSubmit, ...registerForm } = useForm<RegisterData>({ resolver: zodResolver(RegisterSchema) });

	const handleLogin = async ({ email, password }: LoginData) => {
		setIsPending(true);

		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const snapshot = await get(child(ref(db), `users/${userCredential.user.uid}`));
			const user = snapshot.val() as User;

			const token = await userCredential.user.getIdToken();
			nookies.set(null, 'token', token, { path: '/' });

			onSuccess(user);
			dispatch(userActions.loginUser(user));
			setIsPending(false);
		} catch (err) {
			onError?.(err as Error);
			setIsPending(false);
		}
	};

	const handleRegister = async ({ firstName, lastName, email, password }: RegisterData) => {
		setIsPending(true);

		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);

			const user = {
				firstName,
				lastName,
				email,
				isAdmin: false,
				status: UserStatus.USER,
				id: userCredential.user.uid
			};

			await signInWithEmailAndPassword(auth, email, password);
			set(ref(db, `users/${userCredential.user.uid}`), user);

			onSuccess();
			dispatch(userActions.loginUser(user));
			setIsPending(false);
		} catch (err) {
			onError?.(err as Error);
			setIsPending(false);
		}
	};

	const handleGoogleLogin = async () => {
		setIsPending(true);

		try {
			const userCredential = await signInWithPopup(auth, provider);

			if (userCredential) {
				const snapshot = await get(child(ref(db), `users/${userCredential.user.uid}`));
				let user = snapshot.val() as User;

				const token = await userCredential?.user.getIdToken();
				nookies.set(null, 'token', token, { path: '/' });

				if (!user) {
					user = {
						firstName: userCredential.user.displayName?.split(' ')[0] || '',
						lastName: userCredential.user.displayName?.split(' ')[1] || '',
						email: userCredential.user.email || '',
						isAdmin: false,
						status: UserStatus.USER,
						id: userCredential.user.uid
					};

					set(ref(db, `users/${userCredential.user.uid}`), user);
				}

				onSuccess(user);
				dispatch(userActions.loginUser(user));
				setIsPending(false);
			}
		} catch (err) {
			onError?.(err as Error);
			setIsPending(false);
		}
	};

	const handleLogout = async () => {
		setIsPending(true);

		try {
			await signOut(auth);

			nookies.destroy(null, 'token');

			onSuccess();
			dispatch(userActions.logoutUser());
			setIsPending(false);
		} catch (err) {
			onError?.(err as Error);
			setIsPending(false);
		}
	};

	return {
		isPending,
		formLogin: {
			handleLogin: handleLoginSubmit(handleLogin),
			...loginForm,
		},
		formRegister: {
			handleRegister: handleRegisterSubmit(handleRegister),
			...registerForm,
		},
		handleGoogleLogin,
		handleLogout
	};
};