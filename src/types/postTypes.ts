import { Timestamp,DocumentSnapshot, DocumentReference } from "firebase/firestore";
import {  IComment, TComment } from "./commentTypes";
import {  UserShort } from "./userTypes";

export interface IPost {
	author: DocumentReference<UserShort>,
	description: string,
	pictures?: string[],
	likes: DocumentReference<UserShort>[],
	id: string,
	postedDate: Timestamp,
	comments: DocumentReference<IComment>[]
}
export type TPost = {
	author: UserShort,
	description: string,
	pictures?: string[],
	likes: UserShort[],
	id: string,
	postedDate: Timestamp,
	comments: TComment[]
}