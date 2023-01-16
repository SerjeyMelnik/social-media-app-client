import {FC} from 'react'
import { useUserContext } from '../../hooks/useUserContext';
import { EDisplayBlok } from "../../site-config/user-account-management/user_account_management";
import UserInfoLineEdit from './UserInfoLineEdit';


const UserAccountEdit:FC = () =>{
	const {userShort} = useUserContext();
	return(
		<div className={`user-account-manage-blok ${EDisplayBlok.edit_account}`}>
			
				<UserInfoLineEdit label='Username' value={userShort?.userName} name="userName" />
				<UserInfoLineEdit label='First Name' value={userShort?.firstName} name="firstName" />
				<UserInfoLineEdit label='Last Name' value={userShort?.lastName} name="lastName" />
		</div>
	)

}

export default UserAccountEdit;