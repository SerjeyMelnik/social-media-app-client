import { ChatType } from "../types/chatTypes";

export const isUsersHasChat = (chats: ChatType[],users: string[]) => {
	return chats.filter(chat => chat.members.sort().toString() === users.sort().toString() ).length !== 0;
}