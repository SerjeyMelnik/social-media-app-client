import { useState,FC,useEffect } from 'react';
import LikeBtn from './LikeBtn';
import CommentsBtn from './CommentsBtn';
import Comments from './Comments';
import { IPost, TPost } from '../../types/postTypes';
import { PostAuthorInfo } from './PostAuthorInfo';
import PostContent from './PostContent';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { getPost } from '../../firebase/firestore/postOperation';
type PostProps = {
	post: TPost
}
const Post: FC<PostProps> = ({post}) => {
	const [showPostComments,setShowPostComments] = useState(false);
	const [currPost,setCurrPost] = useState<TPost>(post);
	
	useEffect(()=>{
		const unsub = onSnapshot(doc(db,'posts',post.id),async (doc) => {
			console.log(doc.data());
			const currPostData = await getPost(doc.data() as IPost);
			setCurrPost(currPostData)
		})
		return unsub;
	},[])
	return ( 
			<div className="post">
				<PostAuthorInfo author={currPost.author} postedDate={currPost.postedDate}/>
				<PostContent description={currPost.description} pictures={currPost.pictures}/>
				<div className="post_info">
					<LikeBtn postLikes={currPost.likes} postId={currPost.id}/>
					<CommentsBtn setShowPostComments={setShowPostComments} commentsNumber={currPost.comments.length} isCommentsShown={showPostComments}/>
				</div>
				{
					showPostComments && post.comments?.length &&
					<Comments comments={currPost.comments}
							 setShowPostComments={setShowPostComments}
							 isShow={showPostComments}
							 className={showPostComments ? 'show' : 'hide'}/>
				}
			</div>
	 );
}
 
export default Post;