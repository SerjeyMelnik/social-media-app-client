import { useProfileContext } from "../../context-providers/ProfileContextProvider";
import { PROFILE_INFO_BLOCKS } from "../../site-config/profile/profile";
import CustomButton from "../CustomElements/CustomButton";
import ProfileInfoList from "./ProfileInfoList";

const ProfileInfoAboutUser = () => {
	const {user} = useProfileContext();
	
	return ( 
		<div className="profile-info-about-user container">
			<div>
				<div className="profile-info-about-user-img">
					<img src={user?.avatar} alt="user-avatar"/>
				</div>
				<h3 className="profile-info-about-user-title">{user?.userName}</h3>
				<div className="profile-info-about-user-subscribe">
					<CustomButton className="profile-info-about-user-subscribe-button">
						Subscribe
					</CustomButton>
				</div>
			</div>
			<ProfileInfoList listOfProfileInfoBloks={PROFILE_INFO_BLOCKS}/>
		</div>
	 );
}
 
export default ProfileInfoAboutUser;