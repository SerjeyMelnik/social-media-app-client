
import { collection, doc, onSnapshot } from 'firebase/firestore';
import {FC,Fragment,useEffect,useState} from 'react';
import { useAuthProvider } from '../../context-providers/AuthProvider';
import { db } from '../../firebase/firebase';
import { getMessagesForChat, realTimeMessages } from '../../firebase/firestore/chatOperation';
import { getDocRef } from '../../firebase/firestore/getOperation';
import { getShortUserInfoById, getShortUsersInfoByIdArray } from '../../firebase/firestore/userOperation';
import { ChatType, MessageType } from '../../types/chatTypes';
import { UserShort } from '../../types/userTypes';
import SendMessageForm from './SendMessageForm';

type MessagesProps = {
	chat?: ChatType
}
type MessageItemProps = {
	message: MessageType
}
type ChatMatesProps = {
	chat: ChatType
}
const Messages:FC<MessagesProps> = ({chat}) => {
	const {currentUser} = useAuthProvider()
	const [messages, setMessages] = useState<MessageType[]>();
	const [loading, setLoading] = useState<boolean>(false);
	useEffect(()=>{
		const unsub = realTimeMessages(chat as ChatType,setMessages);
		return unsub;
	},[chat])
	return (
	<div className="messages_wrapper">
		{
			chat && 
			<ChatMates chat={chat}/>
		}
		<div className="messages">
			
			{
				messages && !loading &&
				messages.map(msg => <MessageItem key={msg.id} message={msg}/> )
			}
			{
				!chat && <div className='inform-message text'>Choose chat</div>
			}
			{
				loading && <>Loading...</>	
			}
		</div>
		<SendMessageForm chat={chat as ChatType}/>
	</div>
	 );
}

const MessageItem: FC<MessageItemProps> = ({message}) => {
	const {currentUser} = useAuthProvider();
	const [sender, setSender] = useState<UserShort>();
	useEffect(()=>{
		getShortUserInfoById(message.sender)
				.then(setSender)
	},[])
	return (
		<div className={`message ${message.sender === currentUser?.uid ? 'mine' : ''}`}>
			{
				message.sender !== currentUser?.uid ? 
				<div className='other'>
					<img src={sender?.avatar} alt={sender?.userName as string} className='sender-avatar' />
					<div>
						<p className='text message-sender-username'>{sender?.userName}</p>
						<p className='text message-text'>{message.text}</p>
					</div>
				</div> :
				<div className='mine'>
						<p className='text message-text'>{message.text}</p>
				</div>
			}
			
		</div>
	)
}

const ChatMates:FC<ChatMatesProps> = ({chat}) => {
	const {currentUser} = useAuthProvider();
	const [members, setMembers] = useState<UserShort[]>();
	useEffect(()=>{
		getShortUsersInfoByIdArray(chat.members.filter(mmbr => mmbr !== currentUser?.uid))
				.then(setMembers)
	},[chat])
	return (
		<div className="chatmates">
			{
				members?.length &&
				members.length >= 1 ? 
				members.map(mmbr => {
					return (
						<Fragment key={mmbr.userID}>
							<div className="sender-avatar-wrapper">
								<img src={mmbr.avatar} alt={mmbr.userName as string} className="sender-avatar" width='50px'/>
							</div>
							<div className="sender-info">
								<p className="sender-info-username text">{mmbr.userName}</p>
								<p className="sender-info-fullname text">{mmbr.firstName + ' ' + mmbr.lastName}</p>
							</div>
						</Fragment>
					)
				}) : 'no member'
			}
			
		</div>
	)
}
export default Messages;