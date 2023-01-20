
import {FC,useEffect,useState} from 'react';
import { generateItemListOfDays, generateItemListOfMonths, generateItemListOfYears } from '../../utils/generateItemList';
import CustomDropDownList, { Item } from './CustomDropDownList';

type CustomDateSelectorProps = {
	defaultDate?: DateType,
	setDateFunc: (date: DateType) => void
}
export type DateType = {
	day?: number,
	month?: number,
	year?: number
}
const CustomDateSelector: FC<CustomDateSelectorProps> = ({
	defaultDate,
	setDateFunc
}) => {
	const [date,setDate] = useState<DateType>(defaultDate ? defaultDate : {});
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
			setDateFunc(date)
		}
	},[date])
	
	return ( 
		<div className="custom-date-selector">
				<CustomDropDownList itemList={generateItemListOfMonths()}
									label='Month'
									setItem={setMonth}
									width='30'
									required/>

				<CustomDropDownList itemList={generateItemListOfDays(date.month as number)}
									label='Day'
									setItem={setDay}
									width='30'
									disabled={!date.month}
									required/>
									
				<CustomDropDownList itemList={generateItemListOfYears()}
									label='Year'
									setItem={setYear}
									width='30'
									required/>
		</div>
	 );
}
 
export default CustomDateSelector;