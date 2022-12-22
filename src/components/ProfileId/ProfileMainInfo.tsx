import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import {FC} from 'react';
import { useProfileContext } from '../../context-providers/ProfileContextProvider';
import { getDate } from '../../utils/getDate';
import { Timestamp } from 'firebase/firestore';

const ProfileMainInfo:FC = () => {
	const {user} = useProfileContext();
	const userAge = new Date().getFullYear() - (user?.birthDate?.toDate().getFullYear() as number);
	return ( 
		<div className="profile-main-info">
			<div className='profile-main-info-line'>
				<BadgeRoundedIcon/>
				<span className='profile-main-info-name text '>{user?.firstName + ' ' + user?.lastName}</span>
			</div>
			<div className='profile-main-info-line'>
				<PhoneIphoneRoundedIcon/>
				<span className='profile-main-info-phone-number text'>{user?.phoneNumber}</span>
			</div>
			<div className='profile-main-info-line'>
				<CalendarMonthRoundedIcon/>
				<span className='profile-main-info-birth-date text'>{getDate(user?.birthDate as Timestamp).stringDate} ({userAge} y.o.)</span>
			</div>
		</div>
	 );
}
 
export default ProfileMainInfo;