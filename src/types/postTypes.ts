import { Timestamp,DocumentSnapshot } from "firebase/firestore";
import { Comment } from "./commentTypes";
import {  UserShort } from "./userTypes";

export interface IPost {
	author: DocumentSnapshot<UserShort>,
	description: string,
	pictures?: string[],
	likes: DocumentSnapshot<UserShort[]>,
	id: string,
	postedDate: Timestamp,
	comments: DocumentSnapshot<Comment[]>
}
export type TPost = {
	author: UserShort,
	description: string,
	pictures?: string[],
	likes: UserShort[],
	id: string,
	postedDate: Timestamp,
	comments: Comment[]
}