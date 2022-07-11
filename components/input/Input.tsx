import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import { useFormControl } from '../FormControl/useFormControl';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
	isInvalid?: boolean;
	isDisabled?: boolean;
	isReadOnly?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ isDisabled, isInvalid, isReadOnly, placeholder, className, id, required, ...rest }, ref) => {
	const control = useFormControl();

	return (
		<input ref={ref} className={className} id={control.id ?? id} placeholder={placeholder} required={control.isRequired ?? required} disabled={control.isDisabled ?? rest.disabled} readOnly={control.isReadOnly ?? rest.readOnly}
			data-invalid={control.isInvalid} data-disabled={control.isDisabled ?? rest.disabled} {...rest} />
	);
});

Input.displayName = 'Input';