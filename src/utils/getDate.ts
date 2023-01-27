import { Timestamp } from "firebase/firestore";


export const getDate = (date: Timestamp ) =>{

	const stringDate =  date?.toDate().toDateString();
	const simpleDate =  `${date?.toDate().getMonth() + 1}/${date?.toDate().getDate()}/${date?.toDate().getFullYear()}`
	return ({stringDate,simpleDate});
}
export type Month = {
	number: number,
	name: string,
	days: number
}
export const getMonthList = () => {
	return [
		{
			number: 1,
			name: 'January',
			days: 31
		},
		{
			number: 2,
			name: 'February',
			days: 28
		},
		{
			number: 3,
			name: 'March',
			days: 31
		},
		{
			number: 4,
			name: 'April',
			days: 30
		},
		{
			number: 5,
			name: 'May',
			days: 31
		},{
			number: 6,
			name: 'June',
			days: 30
		},
		{
			number: 7,
			name: 'July',
			days: 31
		},
		{
			number: 8,
			name: 'August',
			days: 31
		},
		{
			number: 9,
			name: 'September',
			days: 30
		},
		{
			number: 10,
			name: 'October',
			days: 31
		},
		{
			number: 11,
			name: 'November',
			days: 30
		},
		{
			number: 12,
			name: 'December',
			days: 31
		},
	]
}

export const getMonth = (number: number) => {
	return getMonthList().find(month => month.number === number)
}