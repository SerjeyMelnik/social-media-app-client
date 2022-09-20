import { RecaptchaVerifier,RecaptchaParameters } from 'firebase/auth';
import React, { ChangeEvent,FC, useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { recaptchaInit,signInWithPhoneNumberHandler } from '../../firebase/phoneNumber';
import { TAuthMethod } from '../Auth/ChooseAuthMethod';
import CustomInput from '../CustomElements/CustomInput';


type TFormType = {
	phoneNumber: string
}
type TRegistrationFormWithPhoneNumberProps = {
	setAuthMethod: React.Dispatch<React.SetStateAction<TAuthMethod>>
}
const RegistrationFormWithPhoneNumber:FC<TRegistrationFormWithPhoneNumberProps> = ({setAuthMethod}) => {

	
		
	const initForm: TFormType = {
		phoneNumber: ''
	}
	const [form,setForm] = useState<TFormType>(initForm);

	const changeFieldValue = (e : React.ChangeEvent<HTMLInputElement>) => {
		setForm(state => 
			{ 
				return {...state,[e.target.name]: e.target.value}
			})
	}
	
	const userRegistration = (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		signInWithPhoneNumberHandler(form.phoneNumber);
	}
	useEffect(()=>{
		recaptchaInit();
	})
	
	return ( 
		<div className="reg_form form">
			<div id="sign-in-container"></div>
			<form onSubmit={userRegistration}>
				<h3 className='form-title'>Sign Up</h3>

				<div className="form-inner">
					<CustomInput type = 'text'
								name = 'phoneNumber'
								value = {form.phoneNumber}
								placeholder = '+380990051100'
								label = 'Phone number'
								changeFieldValue = {changeFieldValue}
								/>
					
					<button className='button button-registration'  type='submit'>
						Registration
					</button>

					<Link to={'/registration'} 
					className='choose-another-method link' 
					onClick={()=>{setAuthMethod(null)}}>
						Choose another method of sign up
					</Link>
				</div>
			</form>
		</div> 
	);
}
 
export default RegistrationFormWithPhoneNumber;