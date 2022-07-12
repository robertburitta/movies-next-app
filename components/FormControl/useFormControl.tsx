import React, { createContext, useContext, useId, useMemo, useState } from 'react';

interface FormControlProps {
	id?: string;
	isRequired?: boolean;
	isDisabled?: boolean;
	isInvalid?: boolean;
	isReadOnly?: boolean;
}

type FormControlContextData = ReturnType<typeof useProvideFormControl>;

const FormControlContext = createContext<FormControlContextData>({} as FormControlContextData);

export const FormControlProvider: React.FC<React.PropsWithChildren<FormControlProps>> = ({ children, ...controlProps }) => {
	const value = useProvideFormControl(controlProps);

	return (
		<FormControlContext.Provider value={value}>
			<div className="formControl">
				{children}
			</div>
		</FormControlContext.Provider>
	);
};

const useProvideFormControl = ({ id, isRequired, isReadOnly, isInvalid, isDisabled }: FormControlProps) => {
	const generatedId = useId();
	const _id = id ?? generatedId;
	const [hasHelperText, setHasHelperText] = useState(false);

	return useMemo(() => ({
		id: _id, isRequired, isReadOnly, isInvalid, isDisabled, inputId: `field-${_id}-input`, labelId: `field-${_id}-label`,
		errorId: `field-${_id}-error`, helperId: `field-${_id}-helper`, setHasHelperText, hasHelperText
	}), [isDisabled, isInvalid, isReadOnly, isRequired, _id, hasHelperText]);
};

export const useFormControl = () => useContext(FormControlContext);