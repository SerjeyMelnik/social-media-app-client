import {FC} from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useNavigate } from 'react-router-dom';


const NavigationItemHome:FC = () => {
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
 
export default NavigationItemHome;