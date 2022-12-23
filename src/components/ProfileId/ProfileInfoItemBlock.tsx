import {FC} from 'react';
import { Link } from 'react-router-dom';
import { ProfileInfoBlocksId } from '../../site-config/profile/profile';
import ProfileFriends from './ProfileFriends';
import ProfileMainInfo from './ProfileMainInfo';
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
type ProfileInfoItemBlockProps = {
	blockToRender: ProfileInfoBlocksId,
	setIsOpenInfo: React.Dispatch<React.SetStateAction<boolean>>
}

const ProfileInfoItemBlock:FC<ProfileInfoItemBlockProps> = ({blockToRender,setIsOpenInfo}) => {
	const getComponentToRender = () => {
		switch(blockToRender){
			case 'main-info':
				return <ProfileMainInfo/>;
			case 'friends':
				return <ProfileFriends/>;
		}
	}
	const componentToRender = getComponentToRender();
	return ( 
		<div className="profile-info-item-block">
			<Link to={'#'} onClick={()=>{setIsOpenInfo(false)}} className='link profile-info-item-block-link-back'>
				<ArrowCircleUpRoundedIcon/>
				<span>Go back</span> 
			</Link>
			{componentToRender}
		</div>
	 );
}
 
export default ProfileInfoItemBlock;