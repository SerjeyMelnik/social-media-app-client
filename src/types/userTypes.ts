import { User, UserCredential } from "firebase/auth";
import { DocumentReference, Timestamp } from "firebase/firestore";
import { IPost, TPost } from "./postTypes";

export interface IUserAccountInfo {
	userFull: TUserFull,
	userAuthInfo?: User 
}
export interface IUserFull{
	user_short: DocumentReference<UserShort> | undefined,
	unfilled: TUserShortDataNeedsToFill
}
export type TUserFull = {
	user_short: UserShort,
	unfilled:TUserShortDataNeedsToFill
}
export interface UserShort{
	userName?: string | null,
	avatar?:string,
	birthDate?: Timestamp | null,
	email?: string | null,
	phoneNumber?:string | null,
	firstName?: string | null,
	lastName?: string | null,
	friends?: string[],
	userID: string
}
export type TUserShortField = keyof UserShort;

export type TUserProfileData = {
	displayName?: string,
	photoURL?: string,
	phoneNumber?: string,
	email?:string
}

export type TUserShortDataNeedsToFill = TUserShortField[] | []