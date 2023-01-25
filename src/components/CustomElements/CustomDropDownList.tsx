
import {FC,useState} from 'react';
export type Item = {
	value: string,
	label: string
}
type CustomDropDownListProps = {
	itemList: Item[],
	label: string,
	required?: boolean,
	setItem: (item: Item) => void,
	className?: string,
	disabled?: boolean,
	width?: '25' | '30' | '100',
	defaultSelected?: Item
 }
const CustomDropDownList:FC<CustomDropDownListProps> = ({
	itemList,
	label,
	required,
	setItem,
	className,
	disabled,
	width,
	defaultSelected
}) => {
	const [selectedItem,setSelectedItem] = useState<Item | undefined>(defaultSelected);
	const [isOpen,setIsOpen] = useState<boolean>();

	const selectItem = (item: Item) => {
		setSelectedItem(item);
		setItem(item)
		setIsOpen(false)
	}
	const toggleDropdown = () => {
		if (disabled) return;
		setIsOpen(state => !state)
	}
	return ( 
		<div className={`dropdownlist-wrapper ${width ? 'w-' + width : ''}`}>
			<div className={`dropdownlist ${className ? className : ''} ${disabled ? 'disabled' : ''}`}>
				<span className={`dropdownlist-label ${isOpen || selectedItem ? 'open' : ''} ${required ? 'required' : ''}`}>
					{label}
				</span>
				<p className='dropdownlist-selected-item' onClick={toggleDropdown}>
					{
						selectedItem ?
						selectedItem.label :
						label
					}
				
					
					<span className={`dropdownlist-arrow ${isOpen ? 'up' : 'down'}`}></span>
				</p>
				<ul className={`dropdownlist-items ${isOpen ? 'open' : ''}`}>
					{
						itemList.map(item => (
							<li key={item.value}
								data-value={item.value}
								className={`dropdownlist-item`}
								onClick={() => { selectItem(item) }}
								>{item.label}</li>
						))
					}
				</ul>
			</div>
		</div>
	 );
}
 
export default CustomDropDownList;