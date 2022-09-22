import React, {FC,useState} from 'react'
import { confirmPhone } from '../../firebase/phoneNumberJS';
import CustomInput from "../CustomElements/CustomInput";
import { TMessage } from '../RegistrationForm/RegistrationFormWithEmailPassword';
import FormMessage from './FormMessage';

type TConfirmPhoneCodeProps = {
	some: string
}
type TFormType = {
	confirm_code:{
		value: string,
		error: string
	}
}
type TFormFields = 'confirm_code' ;
const ConfirmPhoneCode:FC<TConfirmPhoneCodeProps> = ({some}) => {
	const initForm: TFormType = {
		confirm_code: {
			value: '',
			error: ''
		}
	}
	const [form,setForm] = useState<TFormType>(initForm);
	const [message,setMessage] = useState<TMessage>(null);
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
	const onSubmitFormHadler = async (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const {isNewUser} = await confirmPhone(form.confirm_code.value);
		console.log("is new user", isNewUser);
		
		setMessage({type: 'success',text: 'User created successfuly!'})
	}
	return (
		
			<form onSubmit={onSubmitFormHadler}>
				<h3 className='form-title'>Sign Up</h3>
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
						<button className='button button-confirm-phone-code'  type='submit'>
							Confirm
						</button>
					</div>
				</div>
			</form>
	
	)
}


export default ConfirmPhoneCode;