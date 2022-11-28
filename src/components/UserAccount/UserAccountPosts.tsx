import {useState,useEffect} from 'react'
import { getPostsByAuthorId } from "../../firebase/firestore/postOperation"
import { useUserContext } from "../../hooks/useUserContext"
import { TPost } from "../../types/postTypes"
import { EDisplayBlok } from "../../utils/constants"
import { PostsList } from "../Post/PostsList"


export const UserAccountPosts = () => {
	const {userInfo} = useUserContext();
	const [posts,setPosts] = useState<TPost[]>();
	const fetchPosts = async () => {
		 const postsData = await getPostsByAuthorId(userInfo?.userAuthInfo?.uid as string)
		setPosts(postsData);
	}
	useEffect(()=>{
		fetchPosts()
	},[])
	return (
		<div className={`user-account-manage-blok ${EDisplayBlok.my_posts}`}>
			<PostsList posts={posts}/>
		</div>
	)
}