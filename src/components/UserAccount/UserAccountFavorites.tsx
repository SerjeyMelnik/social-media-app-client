
import { EDisplayBlok } from "../../site-config/user-account-management/user_account_management";
import FilteredPosts from '../Post/FilteredPosts';

const UserAccountFavorites =  () => {
	
	return ( 
		<div className={`user-account-manage-blok ${EDisplayBlok.favorites}`}>
			<FilteredPosts postsType='posts_which_current_user_liked'/>
		</div>
	 );
}
 
export default UserAccountFavorites;