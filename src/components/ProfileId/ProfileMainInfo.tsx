import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import {FC} from 'react';
import { useProfileContext } from '../../context-providers/ProfileContextProvider';
import { getDate } from '../../utils/getDate';
import { Timestamp } from 'firebase/firestore';
import { getAge } from '../../utils/getAge';

const ProfileMainInfo:FC = () => {
	const {user} = useProfileContext();

	return ( 
		<div className="profile-main-info">
			{
				(user?.firstName && user?.lastName) &&
				<div className='profile-main-info-line'>
					<BadgeRoundedIcon/>
					<span className='profile-main-info-name text '>{user?.firstName + ' ' + user?.lastName}</span>
				</div>
			}
			
			{
				user?.phoneNumber &&
				<div className='profile-main-info-line'>
					<PhoneIphoneRoundedIcon/>
					<span className='profile-main-info-phone-number text'>{user?.phoneNumber}</span>
				</div>
			}
			{
				user?.email &&
				<div className='profile-main-info-line'>
					<EmailRoundedIcon/>
					<span className='profile-main-info-phone-number text'>{user?.email}</span>
				</div>
			}
			{
				user?.birthDate && 
				<div className='profile-main-info-line'>
					<CalendarMonthRoundedIcon/>
					<span className='profile-main-info-birth-date text'>
						{getDate(user?.birthDate as Timestamp).stringDate} ({ getAge(user?.birthDate as Timestamp)} y.o.)
					</span>
				</div>
			}
			
		</div>
	 );
}
 
export default ProfileMainInfo;