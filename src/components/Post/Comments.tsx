import React, { useEffect, useRef , FC} from 'react';
import { IComment } from '../../types/types';
import LeaveTheCommentForm from './LeaveTheCommentForm';

type TCommentProps = {
	comment: IComment
}
type TCommentsProps = {
	isShow: boolean,
	setShowPostComments:React.Dispatch<React.SetStateAction<boolean>>
	className: string | undefined,
	comments: IComment[]
}

const Comment: FC<TCommentProps> = ({comment}) => {
	const commnterAvatar = 'https://john-mohamed.com/wp-content/uploads/2018/05/Profile_avatar_placeholder_large.png';
	return (<div className="comment">
	<div className="author_avatar" >
		<img src={commnterAvatar}  className='author_avatar-img'/>
	</div>
	<div className="comment_content">
		<div className="author_info">
			<h2 className='author_name'>{comment.email}</h2>
			<span className='comment_posted-date'>10 pm</span>
		</div>
		<p className='comment_body'>{comment.body} &#128513;</p>
	</div>
</div>)
}


const Comments: FC<TCommentsProps> = ({comments,isShow,className,setShowPostComments}) => {
	 const comments_wrapper = useRef<HTMLDivElement>(null);
	 const comments_inner = useRef<HTMLDivElement>(null);
	useEffect(()=>{
		const comments_wrapper_Height = comments_wrapper.current?.offsetHeight;
		const comments_inner_Height = comments_inner.current?.offsetHeight;
		console.log(comments_wrapper_Height,comments_inner_Height);
		comments_wrapper.current?.setAttribute("style",`height: ${comments_inner_Height}px;`)
		return () => {
			comments_wrapper.current?.setAttribute("style","height: 0px;")
			// setTimeout(()=>{
			// 	setShowPostComments(state => !state)
			// },1000);
		}
	},[]);
	return (
		
			<div className={`comments_wrapper ${className}`} 
			 ref={comments_wrapper}
			>
			<div className="comments_inner" ref={comments_inner}>
				<div className="comments">
					{
						comments.length ?
						comments.map(comment => 
							<Comment comment={comment}  key={comment.id}/>
							) :
						<span>no comments</span>
					}
				</div>
				<LeaveTheCommentForm />
			</div>
		</div>
		 
	 );
}
 
export default Comments;