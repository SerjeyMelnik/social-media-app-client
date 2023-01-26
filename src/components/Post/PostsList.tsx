import { FC } from "react";
import { useChatsContext } from "../../context-providers/ChatsContextProvider";
import Post from "./Post";
import PostPreloader from "./PostPreloader";



type PostsListProps = {
	posts: string[] | undefined,
	notFoundMsg?: string,
	loading: boolean
}
export const PostsList:FC<PostsListProps> = ({posts,notFoundMsg,loading}) => {
	const {isChatOpen} = useChatsContext()
	return(
		<div className={`posts-list ${isChatOpen ? 'w-90' : ''}`}>
		{
			loading ? <PostPreloader/> :
			posts?.length ? posts.map(post => {
				return <Post postId={post} key={String(post)}/>
			}) : <ThereIsNoPosts notFoundMsg={notFoundMsg}/>
		}
		</div>
	)
}
type ThereIsNoPostsProps = {
	notFoundMsg?: string
}
export const ThereIsNoPosts:FC<ThereIsNoPostsProps> = ({notFoundMsg}) => {
	const message = notFoundMsg ?? 'Any posts not found';
	return <h2 className="not-found">{message}</h2>
}
 