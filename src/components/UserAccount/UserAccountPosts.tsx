
import {FC} from 'react'
import { EDisplayBlok } from "../../site-config/user-account-management/user_account_management"
import FilteredPosts from '../Post/FilteredPosts'



export const UserAccountPosts:FC = () => {
	return (
		<div className={`user-account-manage-blok ${EDisplayBlok.my_posts}`}>
			<FilteredPosts postsType='current_user_posts' />
		</div>
	)
}