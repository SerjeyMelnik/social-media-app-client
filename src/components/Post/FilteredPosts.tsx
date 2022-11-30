import { PostsList } from "./PostsList";
import { FC, useState, useEffect } from 'react';
import { TPost } from "../../types/postTypes";
import { getAllPosts, getPostsByAuthorId, getPostsWhichUserLiked } from "../../firebase/firestore/postOperation";
import { useUserContext } from "../../hooks/useUserContext";

enum PostsTypeEnum{
	current_user_posts = 'current_user_posts',
	all_posts = 'all_posts' ,
	posts_by_user_id = 'posts_by_user_id' ,
	posts_which_current_user_liked = 'posts_which_current_user_liked',
}
export type PostsType = keyof typeof PostsTypeEnum;

type FilteredPostsProps = {
	postsType: PostsType,
	notFoundMsg?: string,
	userId?:string,
}
type PostsStateType = {
	data: TPost[] | undefined,
	loading: boolean
}
const postsInitState: PostsStateType = {
	data: undefined,
	loading: true
}


const FilteredPosts: FC<FilteredPostsProps> = ({postsType,notFoundMsg,userId}) => {
	const {userInfo} = useUserContext();
	const [posts,setPosts] = useState<PostsStateType>(postsInitState);
	const setLoading = (loading: boolean) => {
		setPosts(state => ({
			...state,
			loading
		}))
	}
	const setPostsData = (data: TPost[]) => {
		setPosts(state => ({
			...state,
			data
		}))
	}
	const fetchPostsByAuthorId = async (id: string) => {
		const postsData = await getPostsByAuthorId(id);
		setLoading(false)
		setPostsData(postsData);
	}
	const fetchCurrentUserPosts = async () => {
	   const postsData = await getPostsByAuthorId(userInfo?.userAuthInfo?.uid as string);
	   setLoading(false)
	   setPostsData(postsData);
	}
	const fetchAllPosts = async () => {
	   const postsData = await getAllPosts();
	   setLoading(false)
	   setPostsData(postsData);
	}
	const fetchPostsWhichCurrentUserLiked = async () => {
		const postsData = await getPostsWhichUserLiked(userInfo?.userAuthInfo?.uid as string);
		setLoading(false)
		setPostsData(postsData);
	}
	function fetchFunction() {
		switch (postsType) {
			case PostsTypeEnum.all_posts:
					fetchAllPosts()
				break;
			case PostsTypeEnum.current_user_posts:
					fetchCurrentUserPosts()
				break;
			case PostsTypeEnum.posts_by_user_id:
					fetchPostsByAuthorId(userId as string)
				break;
			case PostsTypeEnum.posts_which_current_user_liked:
					fetchPostsWhichCurrentUserLiked()
				break;
			default:
				return null;
		}
	}
	useEffect(()=>{
		fetchFunction()
	},[postsType]);
	return ( 
		<div className="filtered-posts">
			<PostsList posts={posts.data} loading={posts.loading} notFoundMsg={notFoundMsg}/>
		</div>
	 );
}
 
export default FilteredPosts;