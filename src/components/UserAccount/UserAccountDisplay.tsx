import {FC} from 'react'
import { TDisplayBlok,EDisplayBlok } from "../../utils/constants";
import UserAccountEdit from './UserAccountEdit';
import UserAccountInfo from './UserAccountInfo';
import { UserAccountPosts } from './UserAccountPosts';

type UserAccountDisplayProps = {
	displayBlock: TDisplayBlok
}
const UserAccountDisplay:FC<UserAccountDisplayProps> = ({displayBlock}) => {
	const renderContent = () => {
		switch (displayBlock) {
			case EDisplayBlok.account_info:
				return <UserAccountInfo/>
			case EDisplayBlok.edit_account:
				return <UserAccountEdit/>
			case EDisplayBlok.my_posts:
				return <UserAccountPosts/>
			default:
				return null;
		}
	}
	return renderContent();
}
 
export default UserAccountDisplay;