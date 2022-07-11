import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { ResultHandler } from '../types/ResultHandler';
import zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '../types/User';
import { auth, db } from '../config/firebase';
import { ref, get, child } from 'firebase/database';

const AuthSchema = zod.object({
	email: zod.string().email().min(1),
	password: zod.string().min(6).max(15)
});

type AuthData = zod.infer<typeof AuthSchema>;

export const useAuth = ({ onSuccess, onError }: ResultHandler<User>) => {
	const [isPending, setIsPending] = useState(false);
	const { handleSubmit, ...form } = useForm<AuthData>({ resolver: zodResolver(AuthSchema) });

	const handleLogin = async ({ email, password }: AuthData) => {
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

	return {
		isPending,
		form: {
			handleLogin: handleSubmit(handleLogin), ...form
		}
	};
};