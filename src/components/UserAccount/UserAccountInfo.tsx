
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
			<UserInfoLine property='Username' value={userInfo?.userShort.userName}/>
			<UserInfoLine property='First name' value={userInfo?.userShort.firstName}/>
			<UserInfoLine property='Last name' value={userInfo?.userShort.lastName}/>
			<UserInfoLine property='Phone number' value={userInfo?.userAuthInfo?.phoneNumber}/>
			<UserInfoLine property='Email' value={userInfo?.userAuthInfo?.email}/>
			<UserInfoLine property='Date of birth' value={userInfo?.userShort.birthDate ? getDate(userInfo?.userShort.birthDate).stringDate : null}/>
			<UserInfoLine property='Account created' value={userInfo?.userAuthInfo?.metadata.creationTime}/>
		</div>
	 );
}
 
export default UserAccountInfo;


