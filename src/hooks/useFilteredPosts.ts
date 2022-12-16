import {useState,useEffect} from 'react';
import { getAllPostsId, getPostsByAuthorId, getPostsWhichUserLiked } from '../firebase/firestore/postOperation';
import { useUserContext } from './useUserContext';

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
	data: string[] | undefined,
	loading: boolean
}
const postsInitState: PostsStateType = {
	data: undefined,
	loading: true
}
type UseFilteredPostsType = (postsType: PostsType) => [PostsStateType,React.Dispatch<React.SetStateAction<PostsStateType>>]

export const useFilteredPosts:UseFilteredPostsType = (postsType) => {
	const {userInfo} = useUserContext();
	const [posts,setPosts] = useState<PostsStateType>(postsInitState);
	const setLoading = (loading: boolean) => {
		setPosts(state => ({
			...state,
			loading
		}))
	}
	const setPostsData = (data?: string[]) => {
		setPosts(state => ({
			...state,
			data
		}))
	}
	const getPostData = async () => {
		switch (postsType) {
			case PostsTypeEnum.all_posts:
					return (await getAllPostsId())
			case PostsTypeEnum.current_user_posts:
				return (await  getPostsByAuthorId(userInfo?.userAuthInfo?.uid as string))
			case PostsTypeEnum.posts_by_user_id:
				return (await getPostsByAuthorId(userInfo?.userAuthInfo?.uid as string))
			case PostsTypeEnum.posts_which_current_user_liked:
				return (await  getPostsWhichUserLiked(userInfo?.userAuthInfo?.uid as string))
			default:
				return undefined;
		}
	}
	async function  fetchFunction() {
		const postsData = await getPostData();
		setLoading(false)
		setPostsData(postsData);
	}
	useEffect(()=>{
		fetchFunction();
	},[postsType]);

	return [posts,setPosts];
}