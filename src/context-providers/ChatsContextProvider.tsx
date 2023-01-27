import { createContext, ReactNode, useContext, useState, FC, useEffect } from "react";
import { CodeFixAction } from "typescript";
import { realTimeChats } from "../firebase/firestore/chatOperation";
import { ChatType } from "../types/chatTypes";

type ChatsContextType = {
	chats: ChatType[] | undefined,
	isChatOpen: boolean,
	selectingUserForChat: boolean,
	currentChat: ChatType | undefined,
	setCurrentChat: (chat: ChatType) => void,
	setChats: (chats: ChatType[]) => void,
	openChats: () => void,
	closeChats: () => void,
	toggleChats: () => void,
	setSelectingUserForChat: (value: boolean) => void
}
const defaultChatsContext: ChatsContextType = {
	chats: undefined,
	isChatOpen: false,
	selectingUserForChat: false,
	currentChat: undefined,
	setChats: () => {},
	openChats: () => {},
	closeChats: () => {},
	toggleChats: () => {},
	setSelectingUserForChat: () => {},
	setCurrentChat: () => {}
}
const ChatsContext = createContext(defaultChatsContext);
type ChatsProviderProps = { 
	children: ReactNode
}
const ChatsProvider:FC<ChatsProviderProps> = ({children}) => {
	const [chats, setChats] = useState<ChatType[]>();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectingUserForChat,setSelectingUserForChat] =  useState<boolean>(false);
	const [currentChat,setCurrentChat] = useState<ChatType>()
	const openChats = () => {
		setIsOpen(true)
	} 
	const closeChats = () => {
		setIsOpen(false)	
	} 
	const toggleChats = () => {
		setIsOpen(state => !state)
	}
	const contextValue:ChatsContextType = {
		chats,
		isChatOpen: isOpen,
		selectingUserForChat,
		currentChat,
		setChats,
		openChats,
		closeChats,
		toggleChats,
		setSelectingUserForChat,
		setCurrentChat
	}
	// useEffect(()=>{
	// 	const unsub = realTimeChats(currentUser?.uid as string,setChats)
	// 	return unsub;
	// 	// getChatsForUser(currentUser?.uid as string)
	// 	// 	.then(chats => {
	// 	// 		setChats(chats);
	// 	// 		setLoading(false)
	// 	// 	})
	// },[])
	return ( 
		<ChatsContext.Provider value={contextValue}>  
			{children}
		</ChatsContext.Provider>
	 );
}

export const useChatsContext = () => useContext(ChatsContext);
 
export default ChatsProvider;