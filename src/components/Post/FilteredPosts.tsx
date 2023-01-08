import { PostsList } from "./PostsList";
import { FC, useEffect, } from 'react';
import { useFilteredPosts } from "../../hooks/useFilteredPosts";

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
	userId?: string
}

const FilteredPosts: FC<FilteredPostsProps> = ({postsType,userId,notFoundMsg}) => {
	const [posts,setPosts] = useFilteredPosts(postsType,userId);
	
	return ( 
		<div className="filtered-posts">
			<PostsList posts={posts.data}
			loading={posts.loading}
			notFoundMsg={notFoundMsg}
			/>
		</div>
	 );
}
 
export default FilteredPosts;