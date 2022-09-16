import React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useNavigate } from 'react-router';

const NavigationPanel_Item_home = () => {
	const navigate = useNavigate();

	const navigateTo = () => {
		navigate('/');
	}
	return ( 
		<div className="nav-panel_item" onClick={navigateTo}>
			<div className="nav-panel_item-home">
				<HomeRoundedIcon className='nav-panel_item-svgElement'/>
			
			</div>
		</div>
	 );
}
 
export default NavigationPanel_Item_home;