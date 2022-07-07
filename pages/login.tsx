import React from 'react'
import {FormControlProvider as FormControl} from '../components/FormControl/useFormControl'

export const LoginPage = () => {
  return (
	<div>

		<FormControl isRequired isInvalid={errors.login}>
			<FormLabel>Login</FormLabel>
			<Input {...register('login')}/>
			<FormError ></FormError>
		</FormControl>
		<FormControl isRequired isInvalid={errors.login}>
			<FormLabel>Password</FormLabel>
			<Input/>
			<FormError >{errors.password.massage}</FormError>
		</FormControl>
	</div>
  )
}
