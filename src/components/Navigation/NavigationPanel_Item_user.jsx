import React, { useState } from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import UserPopUp from './UserPopUp';

const NavigationPanel_Item_user = () => {
	const [isShowPopUp,setIsShowPopUp] = useState(false);
	const togglePopUp = () =>{
		setIsShowPopUp(state => !state)
	}
	return ( 
		<div className="nav-panel_item">
			<div className="nav-panel_item-user" onClick={togglePopUp}>
				<PersonRoundedIcon className='nav-panel_item-svgElement'/>
			</div>
			<UserPopUp isShowPopUp = {isShowPopUp}/>
		</div>
	 );
}
 
export default NavigationPanel_Item_user;