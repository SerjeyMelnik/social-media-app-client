import { useUserContext } from "../../hooks/useUserContext"
import { TPost } from "../../types/postTypes"
import { EDisplayBlok } from "../../utils/constants"
import { PostsList } from "../Post/PostsList"


export const UserAccountPosts = () => {
	const {userInfo} = useUserContext() 
	return (
		<div className={`user-account-manage-blok ${EDisplayBlok.my_posts}`}>
			<PostsList posts={userInfo?.userFull.posts as TPost[]}/>
		</div>
	)
}