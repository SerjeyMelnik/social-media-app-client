import CustomButton from "../CustomElements/CustomButton";
import {FC} from 'react';
import { useUserContext } from "../../hooks/useUserContext";
import { subscribeToUser, unsubscribeFromUser } from "../../firebase/firestore/userOperation";

type SubscribeButtonProps = {
	userToSubscribing: string
}

const SubscribeButton:FC<SubscribeButtonProps> = ({userToSubscribing}) => {
	const { userInfo } = useUserContext();

	const subscribe = () => {
		subscribeToUser(userInfo?.userAuthInfo?.uid as string,userToSubscribing)
	}
	const unsubscribe = () => {
		unsubscribeFromUser(userInfo?.userAuthInfo?.uid as string,userToSubscribing)
	}
	const isCurrentUserSubscribed = () => {
		return !!userInfo?.userFull.user_short.friends?.find(userId => userId as string === userToSubscribing);
	}
	if (userInfo?.userAuthInfo?.uid === userToSubscribing) return null;

	return (
	<>
		{
			isCurrentUserSubscribed() ? 
			<CustomButton className="unsubscribe"
							onClickFunc={unsubscribe}>
				Unsubscribe
			</CustomButton> :
			<CustomButton className="subscribe"
							onClickFunc={subscribe}>
				Subscribe
			</CustomButton>
		}
	</>
		
	 );
}
 
export default SubscribeButton;