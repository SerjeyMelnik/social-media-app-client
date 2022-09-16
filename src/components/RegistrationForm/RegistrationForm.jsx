import React from 'react';
import { useState } from 'react';
import CustomInput from '../CustomElements/CustomInput';

const RegistrationForm = () => {
	const initForm = {
		username: '',
		email: '',
		password: ''
	}
	const [form,setForm] = useState(initForm);

	const changeFieldValue = (e) => {
		setForm(state => 
			{ 
				return {...state,[e.target.name]: e.target.value}
			})
	}

	const userRegistration = (e) => {
		e.preventDefault()
	}

	return ( 
		<div className="reg_form form">
			<form onSubmit={userRegistration}>
				<h3 className='form-title'>Sign Up</h3>

				<div className="form-inner">
					<CustomInput type = 'text'
								name = 'username'
								value = {form.username}
								placeholder = 'Username'
								label = 'Username'
								changeFieldValue = {changeFieldValue}
								/>
					<CustomInput type = 'text'
								name = 'email'
								value = {form.email}
								placeholder = 'example@gmail.com'
								label = 'Email'
								changeFieldValue = {changeFieldValue}
								/>
					<CustomInput type = 'password'
								name = 'password'
								value = {form.password}
								placeholder = 'password'
								label = 'Password'
								changeFieldValue = {changeFieldValue}
								/>
					

					

					<button className='button button-registration' type='submit'>
						Registration
					</button>
				</div>
			</form>
		</div> 
	);
}
 
export default RegistrationForm;