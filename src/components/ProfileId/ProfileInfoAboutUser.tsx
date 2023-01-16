import { useProfileContext } from "../../context-providers/ProfileContextProvider";
import { PROFILE_INFO_BLOCKS } from "../../site-config/profile/profile";
import { USER_PLACEHOLDER_IMG } from "../../utils/constants";
import ProfileInfoList from "./ProfileInfoList";
import SubscribeButton from "./SubscribeButton";

const ProfileInfoAboutUser = () => {
	const {user} = useProfileContext();
	
	return ( 
		<div className="profile-info-about-user container">
			<div>
				<div className="profile-info-about-user-img">
						<img src={user?.avatar || USER_PLACEHOLDER_IMG} alt="user-avatar"/> 
				</div>
				<h3 className="profile-info-about-user-title">{user?.userName}</h3>
				
					<div className="profile-info-about-user-subscribe">
					  <SubscribeButton userToSubscribing={user?.userID as string} className='profile-info-about-user-subscribe-button'/>
					</div> 
				
			</div>
			<ProfileInfoList listOfProfileInfoBloks={PROFILE_INFO_BLOCKS}/>
		</div>
	 );
}
 
export default ProfileInfoAboutUser;