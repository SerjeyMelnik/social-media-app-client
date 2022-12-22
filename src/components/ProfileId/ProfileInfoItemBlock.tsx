import {FC} from 'react';
import { ProfileInfoBlocksId } from '../../site-config/profile/profile';
import ProfileFriends from './ProfileFriends';
import ProfileMainInfo from './ProfileMainInfo';

type ProfileInfoItemBlockProps = {
	blockToRender: ProfileInfoBlocksId
}

const ProfileInfoItemBlock:FC<ProfileInfoItemBlockProps> = ({blockToRender}) => {
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
			{componentToRender}
		</div>
	 );
}
 
export default ProfileInfoItemBlock;