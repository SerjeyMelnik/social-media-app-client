import React,{useState} from 'react';
import ChooseAuthMethod, { TAuthMethod } from '../components/Auth/ChooseAuthMethod';
import LoginFormWithEmailAndPassword from '../components/LoginForm/LoginFormWithEmailAndPassword';
import LoginFormWithPhoneNumber from '../components/LoginForm/LoginFormWithPhoneNumber';

const LoginPage = () => {
	const defaultTypeSignUp = null;

	const [typeSignUp,setTypeSignUp] = useState<TAuthMethod>(defaultTypeSignUp);

	if (!typeSignUp) {
		return (
			<main className='login-page'>
				<ChooseAuthMethod title='Choose method of sign in' setAuthMethod={setTypeSignUp}/>
			</main>
		)
	}
	return ( 
		<main className='login-page'>
			{
				typeSignUp === 'phone' ?
				<LoginFormWithPhoneNumber setAuthMethod={setTypeSignUp}/> :
				<LoginFormWithEmailAndPassword setAuthMethod={setTypeSignUp}/>	
			}
			
		</main>
	 );
}
 
export default LoginPage;