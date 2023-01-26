import { createContext, ReactNode, useContext, useState, FC } from "react";
import { ChatType } from "../types/chatTypes";

type ChatsContextType = {
	chats: ChatType[] | null,
	isChatOpen: boolean,
	openChats: () => void,
	closeChats: () => void,
	toggleChats: () => void,
}
const defaultChatsContext: ChatsContextType = {
	chats: null,
	isChatOpen: false,
	openChats: () => {},
	closeChats: () => {},
	toggleChats: () => {}
}
const ChatsContext = createContext(defaultChatsContext);
type ChatsProviderProps = { 
	children: ReactNode
}
const ChatsProvider:FC<ChatsProviderProps> = ({children}) => {
	const [chats, setChats] = useState<ChatType[] | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);

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
		openChats,
		closeChats,
		toggleChats
	}
	return ( 
		<ChatsContext.Provider value={contextValue}>  
			{children}
		</ChatsContext.Provider>
	 );
}

export const useChatsContext = () => useContext(ChatsContext);
 
export default ChatsProvider;