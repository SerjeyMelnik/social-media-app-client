import React, { FC } from 'react';
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

import {createUserWithEmailAndPasswordHandler} from '../../firebase/auth/authWithEmailPassword';
import { setNewUser } from '../../firebase/firestore/userOperation';

import FormMessage from '../Auth/FormMessage';
import CustomInput from '../CustomElements/CustomInput';
import LoaderSpiner from '../CustomElements/LoaderSpiner';


export type TEmailAndPasswordFormType = {
    email: {
        value: string,
        error: string
    },
    password: {
        value: string,
        error: string
    }
}
export type TFormEmailAndPasswordFields = 'email' | 'password';
export type TFormMessage = {
    type: 'success'| 'error',
    text: string 
} | null;
export const initEmailAndPasswordForm: TEmailAndPasswordFormType = {
    email: {
        value: '',
        error: ''
    },
    password: {
        value: '',
        error: ''
    }
}

const RegistrationFormWithEmailPassword: FC = () => {

    const [form,setForm] = useState<TEmailAndPasswordFormType>(initEmailAndPasswordForm);
    const [message,setMessage] = useState<TFormMessage>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigateTo = useNavigate();
    const changeFieldValue = ( e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(state => {
            const targetErrorMsg = e.target.dataset.errorMsg ? e.target.dataset.errorMsg : '';
            return {...state,[e.target.name]: {error: targetErrorMsg, value: e.target.value }}
        })
    }
    const changeFieldError = (fieldName: TFormEmailAndPasswordFields, errorText: string) => {
        setForm(state => ({...state,[fieldName]: {...state[fieldName], error: errorText }}) )
    }
    const clearErrors = (form: HTMLFormElement) => {
        changeFieldError('email','');
        changeFieldError('password','');
    }
    const clearForm = () =>{
        setForm(initEmailAndPasswordForm)
    }
    const userRegistration = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formElem = e.target as HTMLFormElement;
        clearErrors(formElem)
        if(form.password.value.length < 6)
        {
            changeFieldError('password','Password must be longer than 5 symbols');
            return;
        }
        setIsLoading(state=> !state)
        const res = await createUserWithEmailAndPasswordHandler(form.email.value,form.password.value);
       
        if (res.error){
            if(res.error.code === 'auth/email-already-in-use'){
                changeFieldError('email','User already exists, choose another email.')
            }
            else if (res.error.code === 'auth/invalid-email'){
                changeFieldError('email','Invalid email.')
            }
            else {
                
                setMessage({type: 'error', text: res.error.message})
                
            }
           
        }
        else if (res.user){
           
			await setNewUser(res.user?.uid,res.user)
            setMessage({type: 'success',text: 'User created successfuly!'})
            clearForm();
            setTimeout(()=>{
                navigateTo('/');
            },1000)
            
        }
      
        setIsLoading(state=> !state)

    }
     

    
    return ( 
        <div className="reg_form form">
            <form onSubmit={userRegistration}>
                <h3 className='form-title'>Sign Up</h3>
           
                <div className="form-inner">
                    <CustomInput type = 'text'
                                name = 'email'
                                value = {form.email.value}
                                placeholder = 'example@gmail.com'
                                label = 'Email'
                                changeFieldValue = {changeFieldValue}
                                error={form.email.error}
                                />
                    <CustomInput type = 'password'
                                name = 'password'
                                value = {form.password.value}
                                placeholder = 'password'
                                label = 'Password'
                                changeFieldValue = {changeFieldValue}
                                error={form.password.error}
                                />
                    <div className="form-button-wrapper">
                        {
                            message && 
                            <FormMessage message={message} setMessage={setMessage}/>
                        }
                        
                        <button className='button button-registration' disabled={isLoading} type='submit'>
                            {
								isLoading ?
								<div>
									<span>Loading</span>
									<LoaderSpiner/>
                                  
								</div> :
								<span>Sign Up</span>
							}
                        </button>
                        {/* <Link to={'/registration'} 
                        className='choose-another-method link' 
                        onClick={()=>{setAuthMethod(null)}}>
                            Choose another method of sign up
                        </Link> */}
                    </div>
                    
                </div>
            </form>
        </div> 
    );
}
 
export default RegistrationFormWithEmailPassword;