import React, { FC, useState } from 'react';
import ChooseAuthMethod, { TAuthMethod } from '../components/Auth/ChooseAuthMethod';
import RegistrationFormWithEmailPassword from '../components/RegistrationForm/RegistrationFormWithEmailPassword';
import RegistrationFormWithPhoneNumber from '../components/RegistrationForm/RegistrationFormWithPhoneNumber';


const RegistrationPage: FC = () => {
	
	// const defaultTypeSignUp = null;

	// const [typeSignUp,setTypeSignUp] = useState<TAuthMethod>(defaultTypeSignUp);

	// if (!typeSignUp) {
	// 	return (
	// 		<main className='registration-page'>
	// 			<ChooseAuthMethod title='Choose method of sign up' setAuthMethod={setTypeSignUp}/>
	// 		</main>
	// 	)
	// }
	return ( 
		<main className='page registration-page'>
			
			{/* {
				typeSignUp === 'phone' ?
				<RegistrationFormWithPhoneNumber setAuthMethod={setTypeSignUp}/> :
				<RegistrationFormWithEmailPassword setAuthMethod={setTypeSignUp}/>
				
			} */}
			<RegistrationFormWithEmailPassword />
		</main>
	 );
}

export default RegistrationPage;