import {useState,useEffect} from 'react';
import { useAuthProvider } from '../context-providers/AuthProvider';
import { getAllPostsId, getPostsByAuthorId, getPostsWhichUserLiked } from '../firebase/firestore/postOperation';

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
type UseFilteredPostsType = (postsType: PostsType,userId?: string) => [PostsStateType,React.Dispatch<React.SetStateAction<PostsStateType>>]

export const useFilteredPosts:UseFilteredPostsType = (postsType,userId) => {
	const { currentUser } = useAuthProvider()
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
				return (await  getPostsByAuthorId(currentUser?.uid as string))
			case PostsTypeEnum.posts_by_user_id:
				{
					if (userId) return (await getPostsByAuthorId(userId))
					break;
				}
			case PostsTypeEnum.posts_which_current_user_liked:
				return (await  getPostsWhichUserLiked(currentUser?.uid as string))
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
	},[postsType,userId]);

	return [posts,setPosts];
}