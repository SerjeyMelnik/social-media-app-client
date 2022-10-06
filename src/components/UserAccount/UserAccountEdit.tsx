import {FC} from 'react'
import { useUserContext } from '../../hooks/useUserContext';
import { EDisplayBlok, USER_DATA_NEEDS_TO_FILL } from "../../utils/constants"
import UserInfoLineEdit from './UserInfoLineEdit';


const UserAccountEdit:FC = () =>{
	const {userInfo} = useUserContext();
	
	return(
		<div className={`user-account-manage-blok ${EDisplayBlok.edit_account}`}>
			<form action="">
				<UserInfoLineEdit label='Username' value={userInfo?.userFull.user_short.userName} name="userName" />
				<UserInfoLineEdit label='First Name' value={userInfo?.userFull.user_short.firstName} name="firstName" />
				<UserInfoLineEdit label='Last Name'  name="lastName" />

			</form>
		</div>
	)

}

export default UserAccountEdit;