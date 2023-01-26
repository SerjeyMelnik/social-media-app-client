import { Timestamp } from "firebase/firestore"

export type MessageType = {
	sender: string,
	text: string,
	time: Timestamp,
	id: string,
	chatId: string
}
export type ChatType = {
	members: string[],
	messages: MessageType[],
	id: string
}