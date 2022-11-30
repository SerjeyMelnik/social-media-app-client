
import {FC} from 'react'
import { useUserContext } from '../../hooks/useUserContext';
import { EDisplayBlok } from '../../site-config/user-account-management/user_account_management';
import { getDate } from '../../utils/getDate';
import UserInfoLine from './UserInfoLine';

interface TUserInfoProps {
	
}
 
const UserAccountInfo: FC<TUserInfoProps> = () => {

	const {userInfo} = useUserContext();

	return ( 
		<div className={`user-account-manage-blok ${EDisplayBlok.account_info}`}>
			<UserInfoLine property='Username' value={userInfo?.userFull.user_short.userName}/>
			<UserInfoLine property='First name' value={userInfo?.userFull.user_short.firstName}/>
			<UserInfoLine property='Last name' value={userInfo?.userFull.user_short.lastName}/>
			<UserInfoLine property='Phone number' value={userInfo?.userAuthInfo?.phoneNumber}/>
			<UserInfoLine property='Email' value={userInfo?.userAuthInfo?.email}/>
			<UserInfoLine property='Date of birth' value={userInfo?.userFull.user_short.birthDate ? getDate(userInfo?.userFull.user_short.birthDate).stringDate : null}/>
			<UserInfoLine property='Account created' value={userInfo?.userAuthInfo?.metadata.creationTime}/>
		</div>
	 );
}
 
export default UserAccountInfo;


