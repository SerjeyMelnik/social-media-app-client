import { useState } from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import UserPopUp from './UserPopUp';
import { useUserContext } from '../../hooks/useUserContext';

const NavigationPanel_Item_user = () => {
	const [isShowPopUp,setIsShowPopUp] = useState(false);
	const {isUserAuthenticated,userInfo} = useUserContext();
	
	const togglePopUp = () =>{
		setIsShowPopUp(state => !state)
	}
	return ( 
		<div className="nav-panel_item">
			<div className="nav-panel_item-user" onClick={togglePopUp}>
				
				{
					isUserAuthenticated ? 
					<img src={userInfo?.userFull.user_short.avatar} width='40px' className='nav-panel_item-avatar'/>
					:
					<PersonRoundedIcon className='nav-panel_item-svgElement'/>
				}
			</div>
			<UserPopUp isShowPopUp = {isShowPopUp} togglePopUp={togglePopUp}/>
		</div>
	 );
}
 
export default NavigationPanel_Item_user;