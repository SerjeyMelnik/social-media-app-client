import {useState,useEffect} from 'react'
import {  getPostsWhichUserLiked } from '../../firebase/firestore/postOperation';
import { useUserContext } from "../../hooks/useUserContext";
import { TPost } from "../../types/postTypes";
import { EDisplayBlok } from "../../utils/constants";
import { PostsList } from "../Post/PostsList";

const UserAccountFavorites =  () => {
	const {userInfo} = useUserContext()
	const [posts,setPosts] = useState<TPost[]>();
	const fetchPosts = async () => {
		const postsData = await getPostsWhichUserLiked(userInfo?.userAuthInfo?.uid as string)
		setPosts(postsData)
	}
	useEffect(()=>{
		fetchPosts()
	},[])
	return ( 
		<div className={`user-account-manage-blok ${EDisplayBlok.favorites}`}>
			<PostsList posts={posts}/>
		</div>
	 );
}
 
export default UserAccountFavorites;