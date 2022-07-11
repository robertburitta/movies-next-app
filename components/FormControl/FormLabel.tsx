import React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { useFormControl } from '../FormControl/useFormControl';

export const FormLabel: React.FC<React.PropsWithChildren<LabelPrimitive.LabelProps>> = ({ children, ...labelProps }) => {
	const control = useFormControl();

	return (
		<LabelPrimitive.Root {...labelProps} id={control.labelId} htmlFor={control.inputId} data-disabled={control.isDisabled}>
			{children}
		</LabelPrimitive.Root>
	);
};