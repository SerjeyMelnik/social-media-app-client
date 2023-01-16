import { useState } from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import UserPopUp from './UserPopUp';
import { useUserContext } from '../../hooks/useUserContext';
import { USER_PLACEHOLDER_IMG } from '../../utils/constants';
import { useAuthProvider } from '../../context-providers/AuthProvider';

const NavigationItemUser = () => {
	const [isShowPopUp,setIsShowPopUp] = useState(false);
	const {userShort} = useUserContext();
	const {isUserAuthenticated} = useAuthProvider();
	const togglePopUp = () =>{
		setIsShowPopUp(state => !state)
	}
	return ( 
		<div className="nav-panel_item">
			<div className="nav-panel_item-user" onClick={togglePopUp}>
				
				{
					isUserAuthenticated ? 
					<img src={userShort?.avatar || USER_PLACEHOLDER_IMG} width='40px'  alt='img' className='nav-panel_item-avatar'/>
					:
					<PersonRoundedIcon className='nav-panel_item-svgElement'/>
				}
			</div>
			<UserPopUp isShowPopUp = {isShowPopUp} togglePopUp={togglePopUp}/>
		</div>
	 );
}
 
export default NavigationItemUser;