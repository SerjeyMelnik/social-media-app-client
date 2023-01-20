import { Item } from "../components/CustomElements/CustomDropDownList";
import { getMonthList } from "./getDate";


export const generateItemListOfDays = (month: number) => {
	const arr: Item[] = [{value: '1', label: '1'}];
	const lastDay = month === 2 ? 28 : 30;
	for (let i = 1; i < lastDay; i++) {
		const itemValue =  String(1 + Number(arr[i - 1].value))
		arr.push({
			value: itemValue,
			label: itemValue
		})
	}
	return arr;
}
export const generateItemListOfMonths: () => Item[]  = () => {
	return getMonthList().map(item => ({value: String(item.number), label: item.name}))
}
export const generateItemListOfYears = () => {
	const startYear = 1950;
	const endYear = new Date().getFullYear(); 
	const arr: Item[] = [{value: String(startYear), label: String(startYear)}];
	for (let i = 1; i < endYear - startYear; i++) {
		const itemValue =  String(1 + Number(arr[i - 1].value))
		arr.push({
			value: itemValue,
			label: itemValue
		})
	}
	return arr;
}