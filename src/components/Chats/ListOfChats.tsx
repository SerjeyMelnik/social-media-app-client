import { FC, useEffect, useState} from "react";
import { useAuthProvider } from "../../context-providers/AuthProvider";
import { getShortUserInfoById } from "../../firebase/firestore/userOperation";
import { ChatType } from "../../types/chatTypes";
import { UserShort } from "../../types/userTypes";
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import { useChatsContext } from "../../context-providers/ChatsContextProvider";
import { USER_PLACEHOLDER_IMG } from "../../utils/constants";

type ListOfChatsProps = {
	
}
type ChatItemProps = {
	chat: ChatType
}
type StartNewChatProps = {
	setIsListOpen: (state: boolean) => void,
}
const ListOfChats:FC<ListOfChatsProps> = ({}) => {
	const {isChatOpen,setChats,chats} = useChatsContext()

	const [isListOpen,setIsListOpen] =  useState<boolean>(false);
	return ( 
		<div className={`list-of-chats ${isListOpen ? 'open' : ''}`}>
			<StartNewChat setIsListOpen={setIsListOpen} />
			{
				chats && 
				chats.map(chat => <ChatItem key={chat.id} chat={chat}/>)
			}
		</div>
	 );
}

export const ChatItem:FC<ChatItemProps> = ({chat}) => {
	const {currentChat,setCurrentChat} = useChatsContext();
	const {currentUser} = useAuthProvider()
	const [sender, setSender] = useState<UserShort>();
	useEffect(()=>{
		getShortUserInfoById(chat.members.find(mmbr => mmbr !== currentUser?.uid) as string)
				.then(setSender)
	},[])
	return (
		<div className={`chat-item ${currentChat?.id === chat.id ? 'current' : ''}`} onClick={()=> setCurrentChat(chat)}> 
			{
				sender &&
				<>
				<div className={`sender-avatar-wrapper ${currentChat?.id === chat.id ? 'chat-animation' : ''}`}>
					<img src={sender.avatar || USER_PLACEHOLDER_IMG} alt={sender.userName as string} className="sender-avatar" width='50px'/>
				</div>
				<div className="sender-info">
					<p className="sender-info-username text">{sender.userName}</p>
					<p className="sender-info-fullname text">{sender.firstName + ' ' + sender.lastName}</p>
				</div>
				</> 
			}
		</div>
	)
}

const StartNewChat:FC<StartNewChatProps> = ({setIsListOpen}) => {
	const {setSelectingUserForChat,selectingUserForChat} = useChatsContext()
	const startSelectionUser = () => {
		setSelectingUserForChat(true)
	}
	return ( 
		<div className="start-new-chat">
				<div className="chat-item" onClick={startSelectionUser}>
					<div className="start-new-chat-icon-wrapper">
						<AddCommentRoundedIcon className="start-new-chat-icon"/>
					</div>
					<p className="start-new-chat-text text">Start new chat</p>
				</div>
		</div>
	 );
}
 

export default ListOfChats;