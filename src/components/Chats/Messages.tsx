
import {FC,Fragment,useEffect,useState,useRef} from 'react';
import { useAuthProvider } from '../../context-providers/AuthProvider';
import { useChatsContext } from '../../context-providers/ChatsContextProvider';
import {  createNewChat, realTimeMessages } from '../../firebase/firestore/chatOperation';
import { getShortUserInfoById, getShortUsersInfo, getShortUsersInfoByIdArray } from '../../firebase/firestore/userOperation';
import { ChatType, MessageType } from '../../types/chatTypes';
import { UserShort } from '../../types/userTypes';
import { USER_PLACEHOLDER_IMG } from '../../utils/constants';
import { isUsersHasChat } from '../../utils/isUsersHasChat';
import CustomButton from '../CustomElements/CustomButton';
import CustomSearch from '../CustomElements/CustomSearch';
import SendMessageForm from './SendMessageForm';

type MessagesProps = {
	chat?: ChatType
}
type MessageItemProps = {
	message: MessageType
}
type ChatMatesProps = {
	
}
const Messages:FC<MessagesProps> = ({}) => {
	const msgEl = useRef<HTMLDivElement>(null);
	const {currentChat} = useChatsContext();
	const [messages, setMessages] = useState<MessageType[]>();
	const [loading, setLoading] = useState<boolean>(false);
	useEffect(()=>{
		const unsub = realTimeMessages(currentChat as ChatType,setMessages);
		return unsub;
	},[currentChat])
	useEffect(()=>{
		if(messages){
			msgEl.current?.scroll({top: msgEl.current.scrollHeight + 250,left:0,behavior:'smooth'})
		}
	},[messages])

	return (
	<div className="messages_wrapper">
		<ChatMates />
		<div className="messages" ref={msgEl}>
			
			{
				messages && !loading &&
				messages.map(msg => <MessageItem key={msg.id} message={msg}/> )
			}
			
			{
				loading && <>Loading...</>	
			}
		</div>
		<SendMessageForm chat={currentChat as ChatType}/>
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
					<img src={sender?.avatar || USER_PLACEHOLDER_IMG} alt={sender?.userName as string} className='sender-avatar' />
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

const ChatMates:FC<ChatMatesProps> = ({}) => {
	const {currentChat,selectingUserForChat,setSelectingUserForChat,chats,setCurrentChat} = useChatsContext()
	const {currentUser} = useAuthProvider();
	const [members, setMembers] = useState<UserShort[]>();
	const [users,setUsers] =  useState<UserShort[]>();
	const selectSearchResult = async (user: UserShort) => {
		setSelectingUserForChat(false);
		const createdChat = await createNewChat([currentUser?.uid as string,user.userID])
		setCurrentChat(createdChat);
	}
	useEffect(()=>{
		if (currentChat){
			getShortUsersInfoByIdArray(currentChat.members.filter(mmbr => mmbr !== currentUser?.uid))
				.then(setMembers)
		}
	},[currentChat])

	useEffect(()=>{
		getShortUsersInfo().then(setUsers)
	},[])
	return (
		<div className="chatmates">
			{
				(users?.length && selectingUserForChat) &&
				<>
				<CustomSearch 
					arrayOfSearching={
						users.filter(user =>
							(user.userID !== currentUser?.uid) &&
							!isUsersHasChat(chats as ChatType[],[currentUser?.uid as string,user.userID]))
					}
					searchType='UserShort'
					selectOneOfResult={selectSearchResult}
					/>
				<CustomButton onClickFunc={() => {setSelectingUserForChat(false)}} >Cancel</CustomButton>
				</>
				
			}
			{
				(!currentChat && !selectingUserForChat) && <div className='inform-message text'>Choose chat</div>
			}
			{
				(members?.length &&
				members.length >= 1 && !selectingUserForChat) && 
				members.map(mmbr => {
					return (
						<Fragment key={mmbr.userID}>
							<div className="sender-avatar-wrapper">
								<img src={mmbr.avatar || USER_PLACEHOLDER_IMG} alt={mmbr.userName as string} className="sender-avatar" width='50px'/>
							</div>
							<div className="sender-info">
								<p className="sender-info-username text">{mmbr.userName}</p>
								<p className="sender-info-fullname text">{mmbr.firstName + ' ' + mmbr.lastName}</p>
							</div>
						</Fragment>
					)
				})
			}
			
		</div>
	)
}
export default Messages;