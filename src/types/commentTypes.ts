import { Timestamp } from "firebase/firestore";
import { UserShort } from "./userTypes";


export interface Comment{
	author: UserShort,
	body: string,
	likes: UserShort[],
	postedDate: Timestamp
}