import React, { FC } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const LeaveTheCommentForm: FC = () => {
	const sendComment = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(e.target);
	}
	return (
		<form onSubmit={sendComment}> 
			<div className="comment_form-wrapper">
				<div className="comment_input-wrapper">
					<input type="text" name='comment'  className='input comment_input' placeholder='Your comment'/>
				</div>
				<button type='submit' className='post_button send_comment-button' title='Leave the commnet'>
					<SendRoundedIcon className='post_button-svg comment_btn-svg'/>
				</button>
			</div>
		</form>
	 );
}
 
export default LeaveTheCommentForm;