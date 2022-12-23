import {useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import ProfileInfoAboutUser from "../components/ProfileId/ProfileInfoAboutUser";
import FilteredPosts from '../components/Post/FilteredPosts';
import { ProfileContextProvider } from "../context-providers/ProfileContextProvider";
import { getShortUserInfoById } from '../firebase/firestore/userOperation';
import { UserShort } from '../types/userTypes';
import PagePreloader from '../components/ProfileId/PagePreloader';

const ProfileIdPage = () => {
	const [user,setUser] = useState<UserShort>()
	const {userId} = useParams();
	const getData = async () => {
		const userData = await getShortUserInfoById(userId as string);
		setUser(userData)
	}
	useEffect(()=>{
		getData()
	},[userId])
	if(!user) return(
		<div className="page profile-id-page">
			<PagePreloader/>
		</div>
	)
	return ( 
		<div className="page profile-id-page">
			<ProfileContextProvider user={user}>
				<ProfileInfoAboutUser />
				<FilteredPosts postsType='posts_by_user_id' userId={user?.userID}/>
			</ProfileContextProvider>
		</div>
	 );
}
 
export default ProfileIdPage;