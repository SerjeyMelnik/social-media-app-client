import  { FC } from 'react';

import RegistrationFormWithEmailPassword from '../components/RegistrationForm/RegistrationFormWithEmailPassword';



const RegistrationPage: FC = () => {

	return ( 
		<main className='page registration-page'>
			<RegistrationFormWithEmailPassword />
		</main>
	 );
}

export default RegistrationPage;