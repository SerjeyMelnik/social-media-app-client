import { Timestamp } from "firebase/firestore";

type GetAge = (date: Timestamp) => number;

export const getAge:GetAge = (date) => {
	return new Date().getFullYear() - date.toDate().getFullYear();
}