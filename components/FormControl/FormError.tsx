import React from 'react';
import { useFormControl } from '../FormControl/useFormControl';

export const FormError: React.FC<React.PropsWithChildren> = ({ children, ...errorProps }) => {
	const control = useFormControl();

	return (
		<span className="error" {...errorProps} id={control.errorId} data-disabled={control.isDisabled} data-invalid={control.isInvalid}>
			{children}
		</span>
	);
};