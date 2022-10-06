import { Timestamp } from "firebase/firestore";


export const getDate = (date: Timestamp | null | undefined) =>{
	if (!date){
		return null;
	}
	const stringDate =  date?.toDate().toDateString();
	return stringDate;
}