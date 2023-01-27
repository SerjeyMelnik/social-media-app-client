
import { addDoc, collection,  onSnapshot, orderBy, query,  updateDoc, where } from "firebase/firestore";
import { ChatType, MessageType } from "../../types/chatTypes";
import { db } from "../firebase";
import { getCollectionInDocument, getDocument, getFilteredColection } from "./getOperation"

export const getChatsForUser = async (userId: string) => {
	const usersChats = await getFilteredColection('chats',{ fieldPath:'members',opStr:'array-contains',value: userId});
	return usersChats.docs.map(chat => chat.data() as ChatType);
}

export const getChat = async (chatId: string) => {
	const data = await getDocument('chats',chatId);
	return data.data() as ChatType;
}

export const getMessagesForChat = async (chatId: string) => {
	const messageOfChat = await getCollectionInDocument('chats',chatId,'messages','time');
	return messageOfChat.docs.map(msg => msg.data() as MessageType);
}

export const sendMessage = async (message: MessageType) => {
	const newMsg = await addDoc(collection(db,`chats/${message.chatId}/messages`),message);
	await updateDoc(newMsg,{	
		id: newMsg.id,
	})
}

export const realTimeMessages = (chat: ChatType, setMessages: (msg: MessageType[])=> void ) => {
	return onSnapshot(query(collection(db,`chats/${chat?.id}/messages`),orderBy('time')),async (doc) => {
		setMessages(doc.docs.map(item => item.data()) as MessageType[])
	})
}
export const realTimeChats = (chatsOwner:string, setChats: (chats: ChatType[]) => void ) => {
	return onSnapshot(
			query( collection(db,'chats'),
					where('members','array-contains',chatsOwner)
				),async (snap) => {
				setChats(snap.docs.map(item => item.data()) as ChatType[])
	})
}
export const createNewChat = async (members: string[]) => {
	const newChat = await addDoc(collection(db,`chats`),{members});
	await updateDoc(newChat,{	
		id: newChat.id,
	})
	const createdChat = await getChat(newChat.id);
	return createdChat;
}