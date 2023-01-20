import  { FC } from 'react';
import SetInfoAboutUserForm from '../components/Forms/SetInfoAboutUser';



const SetUserInfoPage: FC = () => {

	return ( 
		<main className='page setuserinfo-page'>
			<SetInfoAboutUserForm/>
		</main>
	 );
}

export default SetUserInfoPage;