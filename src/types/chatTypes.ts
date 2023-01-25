import { Timestamp } from "firebase/firestore"

export type Message = {
	sender: string,
	text: string,
	time: Timestamp,
}
export type Chat = {
	members: string[],
	messages: Message[]
}