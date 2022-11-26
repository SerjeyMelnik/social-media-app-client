import React, { useEffect, useRef , FC} from 'react';
import {  TComment } from '../../types/commentTypes';
import { USER_PLACEHOLDER_IMG } from '../../utils/constants';
import { getDate } from '../../utils/getDate';

import LeaveTheCommentForm from './LeaveTheCommentForm';

type TCommentProps = {
	comment: TComment
}
type TCommentsProps = {
	isShow: boolean,
	setShowPostComments:React.Dispatch<React.SetStateAction<boolean>>
	className: string | undefined,
	comments?: TComment[],
	postId: string
}

const Comment: FC<TCommentProps> = ({comment}) => {
	const {stringDate} = getDate(comment.postedDate);
	return (
	<div className="comment">
		<div className="author_avatar" >
			<img src={comment.author.avatar || USER_PLACEHOLDER_IMG} alt="post pocture" className='author_avatar-img'/>
		</div>
		<div className="comment_content">
			<div className="author_info">
				<h2 className='author_name'>{comment.author.userName}</h2>
				<span className='comment_posted-date'>{stringDate}</span>
			</div>
			<p className='comment_body'>{comment.body} </p>
		</div>
	</div>
	)
}


const Comments: FC<TCommentsProps> = ({comments,isShow,className,setShowPostComments,postId}) => {
	 const comments_wrapper = useRef<HTMLDivElement>(null);
	 const comments_inner = useRef<HTMLDivElement>(null);
	useEffect(()=>{
		const comments_wrapper_Height = comments_wrapper.current?.offsetHeight;
		const comments_inner_Height = comments_inner.current?.offsetHeight;
		
		isShow && comments_wrapper.current?.setAttribute("style",`height: ${comments_inner_Height}px;`)
		!isShow && comments_wrapper.current?.setAttribute("style",`height: 0px;`)
		
	},[isShow,comments]);
	return (
		
			<div className={`comments_wrapper ${className}`} 
			 ref={comments_wrapper}
			>
			<div className="comments_inner" ref={comments_inner}>
				<div className="comments">
					{
						comments?.length ?
						comments.map(comment => 
							<Comment comment={comment}  key={comment.id}/>
							) :
						<span className='comments_no'>There are no comments</span>
					}
				</div>
				<LeaveTheCommentForm postId={postId}/>
			</div>
		</div>
		 
	 );
}
 
export default Comments;