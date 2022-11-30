
import {FC} from 'react'
import { EDisplayBlok } from "../../utils/constants"
import FilteredPosts from '../Post/FilteredPosts'



export const UserAccountPosts:FC = () => {
	return (
		<div className={`user-account-manage-blok ${EDisplayBlok.my_posts}`}>
			<FilteredPosts postsType='current_user_posts' />
		</div>
	)
}