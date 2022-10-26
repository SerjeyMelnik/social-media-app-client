import { DocumentReference, Timestamp } from "firebase/firestore";
import { UserShort } from "./userTypes";


export interface IComment{
	author: DocumentReference<UserShort>,
	body: string,
	likes: DocumentReference<UserShort>[],
	postedDate: Timestamp,
	id:string
}
export interface TComment{
	author: UserShort,
	body: string,
	likes: UserShort[],
	postedDate: Timestamp,
	id:string
}