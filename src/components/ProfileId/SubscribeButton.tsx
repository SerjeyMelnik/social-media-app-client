import CustomButton from "../CustomElements/CustomButton";
import {FC, useState} from 'react';
import { useUserContext } from "../../hooks/useUserContext";
import { subscribeToUser, unsubscribeFromUser } from "../../firebase/firestore/userOperation";
import { useNavigate } from "react-router-dom";
import LoaderSpiner from "../CustomElements/LoaderSpiner";

type SubscribeButtonProps = {
	userToSubscribing: string,
	className?: string 
}

const SubscribeButton:FC<SubscribeButtonProps> = ({userToSubscribing,className}) => {
	const { userInfo,isUserAuthenticated } = useUserContext();
	const navigate = useNavigate();
	const [loading,setLoading] = useState<boolean>(false)
	const subscribe = async() => {
		if(!isUserAuthenticated)
		{
			navigate('/login');
			return; 
		}
		setLoading(true)
		await subscribeToUser(userInfo?.userAuthInfo?.uid as string,userToSubscribing)
		setLoading(false)

	}
	const unsubscribe = async () => {
		setLoading(true)
		await unsubscribeFromUser(userInfo?.userAuthInfo?.uid as string,userToSubscribing)
		setLoading(false)

	}
	const isCurrentUserSubscribed = () => {
		return !!userInfo?.userShort.friends?.find(userId => userId as string === userToSubscribing);
	}
	if (userInfo?.userAuthInfo?.uid === userToSubscribing) return null;

	return (
	<>
		{
			isCurrentUserSubscribed() ? 
			<CustomButton className={`unsubscribe ${className}`}
							onClickFunc={unsubscribe}>
				{
					loading ? 
					<>
						<span>Wait please...</span>
						<LoaderSpiner/>
					</> :
					<span>Unsubscribe</span>
				}
					
			</CustomButton> :
			<CustomButton className={`subscribe ${className}`}
							onClickFunc={subscribe}>
				{
					loading ? 
					<>
						<span>Wait please...</span>
						<LoaderSpiner/>
					</> :
					<span>Subscribe</span>
				}
			</CustomButton>
		}
	</>
		
	 );
}
 
export default SubscribeButton;