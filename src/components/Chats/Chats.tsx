import {FC, useEffect, useState}from 'react';
import { useAuthProvider } from '../../context-providers/AuthProvider';
import { useChatsContext } from '../../context-providers/ChatsContextProvider';
import { getChatsForUser, realTimeChats } from '../../firebase/firestore/chatOperation';
import { ChatType } from '../../types/chatTypes';
import ListOfChats from './ListOfChats';
import Messages from './Messages';

type ChatsProps = {
	
}
const Chats:FC<ChatsProps> = ({}) => {
	const {isChatOpen,setChats,chats} = useChatsContext()
	//const [chats, setChats] = useState<ChatType[]>();
	const [loading, setLoading] = useState<boolean>(false);
	const {currentUser} = useAuthProvider()
	useEffect(()=>{
		//setLoading(true)
		const unsub = realTimeChats(currentUser?.uid as string,setChats)
		return unsub;
		// getChatsForUser(currentUser?.uid as string)
		// 	.then(chats => {
		// 		setChats(chats);
		// 		setLoading(false)
		// 	})
	},[currentUser])
	return ( 
		<div className={`chats ${isChatOpen ? 'open' : ''}`}>
			{
				chats && !loading &&
				<>
				<ListOfChats />
				<Messages />
				</>
			}
			
			{
				loading && <>Loading...</>
			}
		</div>
	 );
}
 
export default Chats;