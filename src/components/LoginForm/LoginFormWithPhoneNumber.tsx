import { RecaptchaVerifier,RecaptchaParameters } from 'firebase/auth';
import React, { ChangeEvent,FC, useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { recaptchaInit,signInWithPhoneNumberHandler } from '../../firebase/authWithPhoneNumberJS';
import validatePhoneNumber from '../../utils/validatePhoneNumber';
import { TAuthMethod } from '../Auth/ChooseAuthMethod';
import ConfirmPhoneCode from '../Auth/ConfirmPhoneCode';
import CustomInput from '../CustomElements/CustomInput';
import LoaderSpiner from '../CustomElements/LoaderSpiner';



type TFormPhoneNumberType = {
	phoneNumber: {
		value: string,
		error?: string
	}
	
}
type TFormPhoneNumberFields = 'phoneNumber';

type TLoginFormWithPhoneNumberProps = {
	setAuthMethod: React.Dispatch<React.SetStateAction<TAuthMethod>>
}
export const initForm: TFormPhoneNumberType = {
	phoneNumber: {
		value: '',
		error: ''
	}
}


const LoginFormWithPhoneNumber:FC<TLoginFormWithPhoneNumberProps> = ({setAuthMethod}) => {
	
	const [form,setForm] = useState<TFormPhoneNumberType>(initForm);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isConfirmationCode,setIsConfirmationCode] = useState<boolean>(false);
	const changeFieldValue = (e : React.ChangeEvent<HTMLInputElement>) => {
		setForm(state => 
			{ 
				if(!validatePhoneNumber(e.target.value)){
					changeFieldError('phoneNumber','Invalid phone number')
				}
				else changeFieldError('phoneNumber','')
				
				const targetErrorMsg = e.target.dataset.errorMsg ? e.target.dataset.errorMsg : '';
				return {...state,[e.target.name]: {error: targetErrorMsg, value: e.target.value }}
			})
	}
	const changeFieldError = (fieldName: TFormPhoneNumberFields, errorText: string) => {
		setForm(state => ({...state,[fieldName]: {...state[fieldName], error: errorText }}) )
	}
	const userRegistration = async (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if(!validatePhoneNumber(form.phoneNumber.value)){
			changeFieldError('phoneNumber','Invalid phone number');
			return;
		}
		if(!form.phoneNumber.value){
			changeFieldError('phoneNumber','Field must be filled')
			return;
		}
		setIsLoading(state => !state)
		const res = await signInWithPhoneNumberHandler(form.phoneNumber.value);
		if (res.error){
			//changeFieldError('phoneNumber',res.error.message)
		}
		setIsConfirmationCode(state => !state);

	}
	useEffect(()=>{
		recaptchaInit();
	})
	return ( 
		<div className="reg_form form">
			<div id="sign-in-container"></div>
			{
				isConfirmationCode ? 
				<ConfirmPhoneCode /> :
				<form onSubmit={userRegistration}>
				<h3 className='form-title'>Sign In</h3>
				<div className="form-inner">
					<CustomInput type = 'tel'
								name = 'phoneNumber'
								value = {form.phoneNumber.value}
								placeholder = '+380990051100'
								label = 'Phone number'
								changeFieldValue = {changeFieldValue}
								error={form.phoneNumber.error}
								/>
					
						<button className='button button-login' disabled={isLoading} type='submit'>
							
							{	
								isLoading ?
								<>
									<span>Loading</span>
									<LoaderSpiner/>
								</> :
								<span>Log In</span>
							}
							
						</button>
					

					<Link to={'/login'} 
					className='choose-another-method link' 
					onClick={()=>{setAuthMethod(null)}}>
						Choose another method of sign in
					</Link>
				</div>
			</form>
			}
			
			
		</div> 
	);
}
 
export default LoginFormWithPhoneNumber;