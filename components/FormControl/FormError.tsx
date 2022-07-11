import React from 'react';
import { useFormControl } from '../FormControl/useFormControl';

export const FormError: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<p>
			{children}
		</p>
	);
};