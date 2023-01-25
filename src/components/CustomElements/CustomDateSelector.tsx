
import {FC,useEffect,useState} from 'react';
import { generateItemListOfDays, generateItemListOfMonths, generateItemListOfYears } from '../../utils/generateItemList';
import { getMonth } from '../../utils/getDate';
import CustomDropDownList, { Item } from './CustomDropDownList';

type CustomDateSelectorProps = {
	defaultDate?: DateType,
	setDateFunc: (date: DateType) => void,
	label?: string,
	required?: boolean,
	className?: string
}
export type DateType = {
	day?: number,
	month?: number,
	year?: number
}
const CustomDateSelector: FC<CustomDateSelectorProps> = ({
	defaultDate,
	setDateFunc,
	label,
	required,
	className
}) => {
	const [date,setDate] = useState<DateType>(defaultDate ? defaultDate : {});
	const defaultItems = {
		month: { value: String(date.month), label: getMonth(date.month as number)?.name },
		day: { value: String(date.day), label: String(date.day) },
		year: { value: String(date.year), label: String(date.year) },
	}
	const setDay = (item: Item) => {
		setDate(state => ({
			...state,
			day: Number(item.value)
		}))
	
	}
	const setMonth = (item: Item) => {
		setDate(state => ({
			...state,
			month: Number(item.value)
		}))
	
	}
	const setYear = (item: Item) => {
		setDate(state => ({
			...state,
			year: Number(item.value)
		}))
		
	}
	
	useEffect(()=>{
		if(date.day && date.month && date.year) {
			setDateFunc(date);
		}
	},[date])
	
	return (
		<>
		{label && <p className={`custom-date-selector-label ${required ? 'required' : ''}`}>{label}</p>}
		<div className={`custom-date-selector ${className}`}>
				<CustomDropDownList itemList={generateItemListOfMonths()}
									label='Month'
									setItem={setMonth}
									width='30'
									required
									defaultSelected={defaultItems.month as Item}
									/>

				<CustomDropDownList itemList={generateItemListOfDays(date.month as number)}
									label='Day'
									setItem={setDay}
									width='30'
									disabled={!date.month}
									required
									defaultSelected={defaultItems.day as Item}
									/>

				<CustomDropDownList itemList={generateItemListOfYears()}
									label='Year'
									setItem={setYear}
									width='30'
									required
									defaultSelected={defaultItems.year as Item}
									/>
		</div>
		</>
		
	 );
}
 
export default CustomDateSelector;