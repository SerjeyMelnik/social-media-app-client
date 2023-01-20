import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { generateItemListOfDays, generateItemListOfMonths, generateItemListOfYears } from '../../utils/generateItemList';
import CustomButton from '../CustomElements/CustomButton';
import CustomDateSelector, { DateType } from '../CustomElements/CustomDateSelector';
import CustomDropDownList from '../CustomElements/CustomDropDownList';
import CustomInput from '../CustomElements/CustomInput';
import { TFormMessage } from '../RegistrationForm/RegistrationFormWithEmailPassword';

type SetUserInfoForm = {
	userName: {
        value: string,
        error: string
    },
    firstName: {
        value: string,
        error: string
    },
	lastName: {
		value: string,
        error: string
	},
	birthDate: {
		value: string,
		error: string
	}
}
const initFormValue: SetUserInfoForm = {
	userName: {
        value: '',
        error: ''
    },
    firstName: {
        value: '',
        error: ''
    },
	lastName: {
		value: '',
        error: ''
	},
	birthDate: {
		value: '',
		error: ''
	}
}
type FormFields = 'userName' | 'lastName' | 'firstName' | 'birthDate';
const SetInfoAboutUserForm = () => {
	const [form,setForm] = useState<SetUserInfoForm>(initFormValue);
    const [message,setMessage] = useState<TFormMessage>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigateTo = useNavigate();
    const changeFieldValue = ( e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(state => {
            const targetErrorMsg = e.target.dataset.errorMsg ? e.target.dataset.errorMsg : '';
            return {...state,[e.target.name]: {error: targetErrorMsg, value: e.target.value }}
        })
    }
    const changeFieldError = (fieldName: FormFields, errorText: string) => {
        setForm(state => ({...state,[fieldName]: {...state[fieldName], error: errorText }}) )
    }
    const clearErrors = (form: HTMLFormElement) => {
		for (const property in initFormValue) {
			changeFieldError(property as FormFields,'');
			console.log(`${property}: ${initFormValue[property as FormFields]}`);
		  }
    }
	const setDate = (date: DateType) => {
		setForm( state => {
			return {...state, birthDate: {
							value: `${date.month}/${date.day}/${date.year}`,
							error: ''},
						}})
	}
    const clearForm = () =>{
        setForm(initFormValue)
    }
	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(form);
		
	}
	return ( 
		<div className="form set_user_info">
			<form onSubmit={submitForm} >
				<h3 className='form-title'>We kindly ask you some information about you</h3>

				<div className="form-inner">
				<CustomInput type = 'text'
                             name = {'userName'}
                             value = {form.userName.value}
                             placeholder = 'Type username you want'
                             label = 'Username'
                             changeFieldValue = {changeFieldValue}
                             error={form.userName.error}
							 required
                                />
				<CustomInput type = 'text'
                             name = {'firstName'}
                             value = {form.firstName.value}
                             placeholder = 'First name'
                             label = 'First name'
                             changeFieldValue = {changeFieldValue}
                             error={form.firstName.error}
							 required
                                />
				<CustomInput type = 'text'
                             name = {'lastName'}
                             value = {form.lastName.value}
                             placeholder = 'Last name'
                             label = 'Last name'
                             changeFieldValue = {changeFieldValue}
                             error={form.lastName.error}
							 required
                                />
				<CustomDateSelector setDateFunc={setDate}/>
				<CustomButton className='button-submit-info-user' type="submit">Submit</CustomButton>
				</div>
			</form>
		</div>
	 );
}
 
export default SetInfoAboutUserForm;