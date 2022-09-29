
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import {FC,useEffect,useState} from 'react'
import { db } from '../../firebase/firebase';
import { getCollection, getDocument, getFilteredColection, TWhereProps } from '../../firebase/firestore/getOperation';
import { useUserContext } from '../../hooks/useUserContext';
import { EDisplayBlok } from '../../utils/constants';
import {IUserAccountInfo, UserDataFirestore} from '../../types/userTypes'
import { getUser } from '../../firebase/firestore/userOperation';

interface UserAccountInfoProps {
	
}
 
const UserAccountInfo: FC<UserAccountInfoProps> = () => {
	
	const [userAccountInfo,setUserAccountInfo] = useState<IUserAccountInfo>();
	const {userAuthInfo} = useUserContext();
	
	async function getUserdata() {
			
		const userInfo = await getUser(userAuthInfo?.uid as string);
		const userAccountInfoMerged = {...userInfo,...userAuthInfo} as IUserAccountInfo ;
		setUserAccountInfo(userAccountInfoMerged)
		
	}
	
	useEffect(()=>{
		getUserdata()
	},[])
	return ( 
		<div className={`user-account-manage-blok ${EDisplayBlok.account_info}`}>
			<UserInfoLine property='First name' value={userAccountInfo?.firstName}/>
			<UserInfoLine property='Last name' value={userAccountInfo?.lastName}/>
			<UserInfoLine property='Phone number' value={userAccountInfo?.phoneNumber}/>
			<UserInfoLine property='Email' value={userAccountInfo?.email}/>
			<UserInfoLine property='Date of birth' value={userAccountInfo?.birthDate}/>
			<UserInfoLine property='Account created' value={userAccountInfo?.metadata.creationTime}/>
		</div>
	 );
}
 
export default UserAccountInfo;


type TUserInfoLine = {
	property:string,
	value: string | undefined | null
}
const UserInfoLine:FC<TUserInfoLine> = ({property,value}) => {
	if(!value){
		return null;
	}
	return (
		<div className="user_info_line">
				<span className='user_info_line-property'>
					{property}: 
				</span>
				<span className='user_info_line-value'>
					{value}
				</span>
			</div>
	)
}