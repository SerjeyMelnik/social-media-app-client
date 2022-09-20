import React, { useState,FC, useEffect } from 'react';
import LikeBtn from './LikeBtn';
import CommentsBtn from './CommentsBtn';
import { comments_test } from '../../utils/testData';
import Comments from './Comments';
import { IComment, IPost, IUser } from '../../types/types';
import useFetchData from '../../fakeAPI/useFetchData';
type PostProps = {
	post: IPost
}
const Post: FC<PostProps> = ({post}) => {
	const userImgThumb = "https://john-mohamed.com/wp-content/uploads/2018/05/Profile_avatar_placeholder_large.png";
	const postPicture = "https://static.toiimg.com/photo/msid-75503669,width-96,height-65.cms";
	const [showPostComments,setShowPostComments] = useState(false);
	//const comments = [...comments_test];
	const [comments,setComments] = useState<IComment[]>([]);
	const [user,setUser] = useState<IUser>();
	const {getCommentsToPost,getUser} = useFetchData();
	useEffect(()=>{
		getUser(post.userId).then(data => setUser(data));
		getCommentsToPost(post.id).then(data => setComments(data))
	},[]);
	
	return ( 
			<div className="post">
				<div className="post_user-info">
					<div className="post_user-avatar">
						<img src={userImgThumb} width='50px' className='post_user-avatar-img'/>
					</div>
					<div className="post_user-detail">
						<h2 className="post_user-name">{user?.name}</h2>
						<p className='post_user-posted-date'>posted 1 hour ago</p>
					</div>
				</div>
				<div className="post_content">
					<p className="post_content-description">
						{post.body}
					</p>
					<div className="post_content-picture">
						<img src={postPicture} className='post_content-picture-img'/>
					</div>
				</div>
				<div className="post_info">
					<LikeBtn/>
					<CommentsBtn setShowPostComments={setShowPostComments} commentsNumber={comments?.length} isCommentsShown={showPostComments}/>
				</div>
				{
					showPostComments && comments?.length &&
					<Comments comments={comments}
							 setShowPostComments={setShowPostComments}
							 isShow={showPostComments}
							 className={showPostComments ? 'show' : 'hide'}/>
				}
					


			</div>
	 );
}
 
export default Post;