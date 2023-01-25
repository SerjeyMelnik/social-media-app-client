import {FC} from 'react'
import { useUserContext } from '../../hooks/useUserContext';
import { TDisplayBlok,EDisplayBlok } from "../../site-config/user-account-management/user_account_management";
import UserAccountCreatePost from './UserAccountCreatePost';
import UserAccountEdit from './UserAccountEdit';
import UserAccountFavorites from './UserAccountFavorites';
import UserAccountInfo from './UserAccountInfo';
import { UserAccountPosts } from './UserAccountPosts';

type UserAccountDisplayProps = {
	displayBlock: TDisplayBlok
}
const UserAccountDisplay:FC<UserAccountDisplayProps> = ({displayBlock}) => {
	const {userShort} = useUserContext()
	if(!userShort) return (
		<div className='user-account-manage-blok'>
			<span className='text'>Waiting for data...</span> 
		</div>
)
	const renderContent = () => {
		switch (displayBlock) {
			case EDisplayBlok.account_info:
				return <UserAccountInfo/>
			case EDisplayBlok.edit_account:
				return <UserAccountEdit/>
			case EDisplayBlok.my_posts:
				return <UserAccountPosts/>
			case EDisplayBlok.favorites:
				return <UserAccountFavorites/>
			case EDisplayBlok.create_post:
				return <UserAccountCreatePost/>
			default:
				return null;
		}
	}
	return renderContent();
}
 
export default UserAccountDisplay;