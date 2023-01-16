
import {FC} from 'react'
import { useAuthProvider } from '../../context-providers/AuthProvider';
import { useUserContext } from '../../hooks/useUserContext';
import { EDisplayBlok } from '../../site-config/user-account-management/user_account_management';
import { getDate } from '../../utils/getDate';
import UserInfoLine from './UserInfoLine';

interface TUserInfoProps {
	
}
 
const UserAccountInfo: FC<TUserInfoProps> = () => {

	const {userShort} = useUserContext();
	const {currentUser} = useAuthProvider();
	return ( 
		<div className={`user-account-manage-blok ${EDisplayBlok.account_info}`}>
			<UserInfoLine property='Username' value={userShort?.userName}/>
			<UserInfoLine property='First name' value={userShort?.firstName}/>
			<UserInfoLine property='Last name' value={userShort?.lastName}/>
			<UserInfoLine property='Phone number' value={currentUser?.phoneNumber}/>
			<UserInfoLine property='Email' value={currentUser?.email}/>
			<UserInfoLine property='Date of birth' value={userShort?.birthDate ? getDate(userShort?.birthDate).stringDate : null}/>
			<UserInfoLine property='Account created' value={currentUser?.metadata.creationTime}/>
		</div>
	 );
}
 
export default UserAccountInfo;


