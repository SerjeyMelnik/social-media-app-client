import React,{ FC, useState} from 'react';
import ChooseAuthMethod, { TAuthMethod } from '../components/Auth/ChooseAuthMethod';
import LoginFormWithEmailAndPassword from '../components/LoginForm/LoginFormWithEmailAndPassword';
import LoginFormWithPhoneNumber from '../components/LoginForm/LoginFormWithPhoneNumber';


const LoginPage:FC = () => {
	const [typeSignIn,setTypeSignIn] = useState<TAuthMethod>(null);
	
	const setTypeSignInHandler = (signInType : TAuthMethod) => {
		setTypeSignIn(signInType);	
	}
	
	
	if (!typeSignIn) {
		return (
			<main className='page login-page'>
				<ChooseAuthMethod title='Choose method of sign in' setAuthMethod={setTypeSignInHandler}/>
			</main>
		)
	}
	return ( 
		<main className='page login-page'>
			{
				typeSignIn === 'phone' ?
				<LoginFormWithPhoneNumber setAuthMethod={setTypeSignInHandler}/> :
				<LoginFormWithEmailAndPassword setAuthMethod={setTypeSignInHandler}/>	
			}
			
		</main>
	 );
}
 
export default LoginPage;