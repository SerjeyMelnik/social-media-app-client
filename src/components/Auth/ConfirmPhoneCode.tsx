import { AuthError, ConfirmationResult } from 'firebase/auth';
import React, {FC,useState} from 'react'
import { confirmPhone } from '../../firebase/authWithPhoneNumberJS';
import CustomInput from "../CustomElements/CustomInput";
import LoaderSpiner from '../CustomElements/LoaderSpiner';
import { TFormMessage } from '../RegistrationForm/RegistrationFormWithEmailPassword';
import FormMessage from './FormMessage';


type TFormType = {
	confirm_code:{
		value: string,
		error: string
	}
}
interface IConfirmPhone {
	result: ConfirmationResult | null,
	isNewUser: boolean | null,
	error: AuthError | null
}
type TFormFields = 'confirm_code' ;
const ConfirmPhoneCode:FC = () => {
	const initForm: TFormType = {
		confirm_code: {
			value: '',
			error: ''
		}
	}
	const [form,setForm] = useState<TFormType>(initForm);
	const [message,setMessage] = useState<TFormMessage>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const changeFieldValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		const targetErrorMsg = e.target.dataset.errorMsg ? e.target.dataset.errorMsg : '';
		if(e.target.value.length == 7) return;
		setForm((state:TFormType) => {
			
			return ({...state,[e.target.name]:{value: e.target.value, error: targetErrorMsg}})
		})
	}
	
	const changeFieldError = (fieldName: TFormFields, errorText: string) => {
		setForm(state => ({...state,[fieldName]: {...state[fieldName], error: errorText }}) )
	}
	const clearForm = () =>{
		setForm(initForm)
		changeFieldError('confirm_code','')
	}
	const onSubmitFormHadler = async (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!form.confirm_code){
			changeFieldError('confirm_code','Field must be filled')
			return;
		}
		setIsLoading(state => !state)

		const {result,isNewUser,error}: IConfirmPhone = await confirmPhone(form.confirm_code.value);
		if(error){
			
			 changeFieldError('confirm_code','Invalid verification code')
			
		}
		else if (result){

		}
		setIsLoading(state => !state)
		clearForm()

	}
	return (
		
			<form onSubmit={onSubmitFormHadler}>
				<h3 className='form-title'>Sign In</h3>
				<div className="form-inner">
					<CustomInput type='text'
						placeholder='Confirmation code'
						name='confirm_code'
						label='Type confirmation code sended to you'
						value={form.confirm_code.value}
						changeFieldValue={changeFieldValue}
						error={form.confirm_code.error}
						/>
					<div className="form-button-wrapper">
						{
							message && 
							<FormMessage message={message} setMessage={setMessage}/>
						}
						<button className='button button-confirm-phone-code' disabled={isLoading} type='submit'>
							{	
								isLoading ?
								<>
									<span>Loading</span>
									<LoaderSpiner/>
								</> :
								<span>Confirm</span>
							}
						</button>
					</div>
				</div>
			</form>
	
	)
}


export default ConfirmPhoneCode;