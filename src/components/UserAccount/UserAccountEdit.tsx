import {FC} from 'react'
import { useUserContext } from '../../hooks/useUserContext';
import { EDisplayBlok } from "../../site-config/user-account-management/user_account_management";
import UserInfoLineEdit from './UserInfoLineEdit';


const UserAccountEdit:FC = () =>{
	const {userInfo} = useUserContext();
	
	return(
		<div className={`user-account-manage-blok ${EDisplayBlok.edit_account}`}>
			
				<UserInfoLineEdit label='Username' value={userInfo?.userFull.user_short.userName} name="userName" />
				<UserInfoLineEdit label='First Name' value={userInfo?.userFull.user_short.firstName} name="firstName" />
				<UserInfoLineEdit label='Last Name' value={userInfo?.userFull.user_short.lastName} name="lastName" />
		</div>
	)

}

export default UserAccountEdit;