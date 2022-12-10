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
	postId: string
}
const Post: FC<PostProps> = ({postId}) => {
	const [showPostComments,setShowPostComments] = useState(false);
	const [currPost,setCurrPost] = useState<TPost>();
	
	
	useEffect(()=>{
		const unsub = onSnapshot(doc(db,'posts',postId),async (doc) => {
			const currPostData = await getPost(doc.data() as IPost);
			setCurrPost(currPostData)
		})
		return unsub;
	},[postId])
	if(!currPost) return <></>;
	return ( 
			<div className="post">
				<PostAuthorInfo author={currPost.author} postedDate={currPost.postedDate} postId={currPost.id}/>
				<PostContent description={currPost.description} pictures={currPost.pictures}/>
				<div className="post_info">
					<LikeBtn postLikes={currPost.likes} postId={currPost.id}/>
					<CommentsBtn setShowPostComments={setShowPostComments} commentsNumber={currPost.comments.length} isCommentsShown={showPostComments}/>
				</div>
				
					<Comments comments={currPost.comments}
							 setShowPostComments={setShowPostComments}
							 isShow={showPostComments}
							 className={showPostComments ? 'show' : 'hide'}
							 postId={currPost.id}
							 />
				
			</div>
	 );
}
 
export default Post;