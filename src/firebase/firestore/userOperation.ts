
import { UserDataFirestore } from "../../types/userTypes"
import { getCollection, getDocument } from "./getOperation";

type TGetUser = (userID:string) => Promise<UserDataFirestore>;
type TGetUsers = () => Promise<UserDataFirestore[]>;
export const getUser:TGetUser = async (userID:string) => {
	const docSnap = await getDocument('users',userID);
	const res = docSnap.data() as UserDataFirestore;
	 return res;
}

export const getUsers:TGetUsers = async () => {
	const usersDocs = await getCollection('users');
	const users = usersDocs.docs.map(user=>user.data()) as UserDataFirestore[];
	return users;
}
