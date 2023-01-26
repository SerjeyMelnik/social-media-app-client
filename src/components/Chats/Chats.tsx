import {FC, useEffect, useState}from 'react';
import { useAuthProvider } from '../../context-providers/AuthProvider';
import { useChatsContext } from '../../context-providers/ChatsContextProvider';
import { getChatsForUser } from '../../firebase/firestore/chatOperation';
import { ChatType } from '../../types/chatTypes';
import ListOfChats from './ListOfChats';
import Messages from './Messages';

type ChatsProps = {
	
}
const Chats:FC<ChatsProps> = ({}) => {
	const {isChatOpen} = useChatsContext()
	const [chats, setChats] = useState<ChatType[]>();
	const [openedChat,setOpenedChat] = useState<ChatType>()
	const [loading, setLoading] = useState<boolean>(false);
	const {currentUser} = useAuthProvider()
	useEffect(()=>{
		setLoading(true)
		getChatsForUser(currentUser?.uid as string)
			.then(chats => {
				setChats(chats);
				setLoading(false)
			})
	},[])
	return ( 
		<div className={`chats ${isChatOpen ? 'open' : ''}`}>
			{
				chats && !loading &&
				<>
				<ListOfChats chats={chats} openedChat={openedChat} setOpenedChat={setOpenedChat}/>
				<Messages chat={openedChat}/>
				</>
			}
			
			{
				loading && <>Loading...</>
			}
		</div>
	 );
}
 
export default Chats;