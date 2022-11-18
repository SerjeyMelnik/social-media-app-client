import { Timestamp } from "firebase/firestore";


export const getDate = (date: Timestamp ) =>{

	const stringDate =  date?.toDate().toDateString();
	
	return ({stringDate});
}