import { User, UserCredential } from "firebase/auth";

export interface UserDataFirestore {
	birthDate?: string,
	Email?: string,
	PhoneNumber?:string,
	firstName?: string,
	lastName?: string,
	userID: string
}
export interface IUserAccountInfo extends UserDataFirestore,User{

}