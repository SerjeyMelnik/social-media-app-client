import { FC } from "react";
import { TPost } from "../../types/postTypes";
import Post from "./Post";

type PostsListProps = {
	posts: TPost[]
}
export const PostsList:FC<PostsListProps> = ({posts}) => {

	return(
		<div className="posts-list">
		{
			posts?.length && posts.map(post => {
				return <Post post={post} key={String(post.id)}/>
			}) 
		}
		</div>
	)
}
 