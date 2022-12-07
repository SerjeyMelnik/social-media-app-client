import {FC} from 'react'
import { EDisplayBlok } from '../../site-config/user-account-management/user_account_management';
import CreateNewPostForm from './CreateNewPostForm';

const UserAccountCreatePost:FC = () => {
	return ( 
		<div className={`user-account-manage-blok ${EDisplayBlok.create_post}`}>
			<CreateNewPostForm/>
		</div>
	 );
}
 
export default UserAccountCreatePost;