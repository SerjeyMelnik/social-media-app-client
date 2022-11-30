
import { EDisplayBlok } from "../../utils/constants";
import FilteredPosts from '../Post/FilteredPosts';

const UserAccountFavorites =  () => {
	
	return ( 
		<div className={`user-account-manage-blok ${EDisplayBlok.favorites}`}>
			<FilteredPosts postsType='posts_which_current_user_liked'/>
		</div>
	 );
}
 
export default UserAccountFavorites;