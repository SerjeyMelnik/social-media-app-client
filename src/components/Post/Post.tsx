import { useState,FC, useEffect } from 'react';
import LikeBtn from './LikeBtn';
import CommentsBtn from './CommentsBtn';
import Comments from './Comments';
import { IComment, IPost, IUser } from '../../types/types';
import useFetchData from '../../fakeAPI/useFetchData';
import { TPost } from '../../types/postTypes';
type PostProps = {
	post: TPost
}
const Post: FC<PostProps> = ({post}) => {
	const [showPostComments,setShowPostComments] = useState(false);
	
	return ( 
			<div className="post">
				<div className="post_user-info">
					<div className="post_user-avatar">
						<img src={post.author.avatar}  className='post_user-avatar-img'/>
					</div>
					<div className="post_user-detail">
						<h2 className="post_user-name">{post.author.userName}</h2>
						<p className='post_user-posted-date'>{post.postedDate.toDate().getDate()}</p>
					</div>
				</div>
				<div className="post_content">
					<p className="post_content-description">
						{post.description}
					</p>
					<div className="post_content-picture">
						{
							post.pictures &&
							<img src={post.pictures[0]} className='post_content-picture-img'/> 
						}
					</div>
				</div>
				<div className="post_info">
					<LikeBtn post={post}/>
					<CommentsBtn setShowPostComments={setShowPostComments} commentsNumber={post.comments.length} isCommentsShown={showPostComments}/>
				</div>
				{
					showPostComments && post.comments?.length &&
					<Comments comments={post.comments}
							 setShowPostComments={setShowPostComments}
							 isShow={showPostComments}
							 className={showPostComments ? 'show' : 'hide'}/>
				}
					


			</div>
	 );
}
 
export default Post;