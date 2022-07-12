import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { ResultHandler } from '../types/ResultHandler';
import zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, UserStatus } from '../types/User';
import { auth, db } from '../config/firebase';
import { ref, get, child, set } from 'firebase/database';

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
	const [isPending, setIsPending] = useState(false);
	const { handleSubmit: handleLoginSubmit, ...loginForm } = useForm<LoginData>({ resolver: zodResolver(LoginSchema) });
	const { handleSubmit: handleRegisterSubmit, ...registerForm } = useForm<RegisterData>({ resolver: zodResolver(RegisterSchema) });

	const handleLogin = async ({ email, password }: LoginData) => {
		setIsPending(true);

		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const snapshot = await get(child(ref(db), `users/${userCredential.user.uid}`));

			onSuccess(snapshot.val() as User);
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

			onSuccess?.(user);
			setIsPending(false);
		} catch (err) {
			onError?.(err as Error);
			setIsPending(false);
		}
	};

	return {
		isPending,
		form: {
			handleLogin: handleLoginSubmit(handleLogin),
			...loginForm,
			handleRegister: handleRegisterSubmit(handleRegister),
			...registerForm
		}
	};
};