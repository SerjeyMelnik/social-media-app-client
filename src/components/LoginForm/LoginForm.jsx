import React ,{useState}from 'react';
import CustomInput from '../CustomElements/CustomInput';

const LoginForm = () => {
	const initForm = {
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
	const userLogin = (e) => {
		e.preventDefault()
	}
	return ( 
		<div className="login_form form">
			<form onSubmit={userLogin}>
				<h3 className='form-title'>Sign In</h3>

				<div className="form-inner">
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
					<button className='button button-login' type='submit'>
						Log In
					</button>
				</div>
			</form>
		</div> 

	 );
}
 
export default LoginForm;