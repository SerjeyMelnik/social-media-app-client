import { FC, useEffect, useState} from "react";
import { useAuthProvider } from "../../context-providers/AuthProvider";
import { getShortUserInfoById } from "../../firebase/firestore/userOperation";
import { ChatType } from "../../types/chatTypes";
import { UserShort } from "../../types/userTypes";

type ListOfChatsProps = {
	chats: ChatType[],
	setOpenedChat: (chat: ChatType) => void
}
type ChatItemProps = {
	chat: ChatType,
	setOpenedChat: (chat: ChatType) => void

}
const ListOfChats:FC<ListOfChatsProps> = ({chats,setOpenedChat}) => {

	return ( 
		<div className="list-of-chats">
			{
				chats && 
				chats.map(chat => <ChatItem key={chat.id} chat={chat} setOpenedChat={setOpenedChat}/>)
			}
		</div>
	 );
}

const ChatItem:FC<ChatItemProps> = ({chat,setOpenedChat}) => {
	const {currentUser} = useAuthProvider()
	const [sender, setSender] = useState<UserShort>();
	useEffect(()=>{
		getShortUserInfoById(chat.members.find(mmbr => mmbr !== currentUser?.uid) as string)
				.then(setSender)
	},[])
	return (
		<div className="chat-item" onClick={()=> setOpenedChat(chat)}> 
			{
				sender &&
				<>
				<div className="sender-avatar-wrapper">
					<img src={sender.avatar} alt={sender.userName as string} className="sender-avatar" width='50px'/>
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
 
export default ListOfChats;