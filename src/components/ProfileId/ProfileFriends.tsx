import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProfileContext } from "../../context-providers/ProfileContextProvider";
import { getShortUsersInfoByIdArray } from "../../firebase/firestore/userOperation";
import { UserShort } from "../../types/userTypes";
import { USER_PLACEHOLDER_IMG } from "../../utils/constants";
import { getAge } from "../../utils/getAge";
import SubscribeButton from "./SubscribeButton";

const FriendInfo: FC<{friend: UserShort}> = ({friend}) => {
	return (
		<div className="friend">
			<img src={friend.avatar || USER_PLACEHOLDER_IMG}
				 alt="friend-img"
				 className="friend-img"/>
			<div className="friend-info">
				<Link to={friend.userID} className='friend-info-username main-name'>{friend.userName}</Link>
				{
					friend.firstName && friend.lastName &&
					<p className="friend-info-fullname">
						<span>{friend.firstName} {friend.lastName}</span>
						{
							friend.birthDate && 
							<span>{getAge(friend.birthDate)}</span>
						}
					</p>
				}
				<SubscribeButton userToSubscribing={friend.userID}/>
			</div>
		</div>
	)
}


const ProfileFriends:FC = () => {
	const {user} = useProfileContext();
	const [friends,setFriends] = useState<UserShort[]>();
	const getFriends = async () => {
		const friendsData = user?.friends ? await getShortUsersInfoByIdArray(user?.friends) : [];
		setFriends(friendsData);
	}
	useEffect(()=>{
		getFriends()
	},[])
	return ( 
		<div className="friends">
			{
				friends && 
				friends.map(friend => {
					return <FriendInfo friend={friend} key={friend.userID}/>
				})
			}
		</div>
	 );
}
 
export default ProfileFriends;