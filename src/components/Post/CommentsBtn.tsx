import React, {FC} from 'react';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
type CommentsBtnProps = {
	setShowPostComments: React.Dispatch<React.SetStateAction<boolean>>,
	commentsNumber: number
}
const CommentsBtn: FC<CommentsBtnProps> = ({setShowPostComments,commentsNumber}) => {
	const toggleComments = () => {
		setShowPostComments( state => !state )
	}
	return ( 
		<div className="comments_btn-wrapper"> 
			<button className="comments_btn post_button" title='comments' onClick={toggleComments}>
				<ChatRoundedIcon className='comments_btn-svg post_button-svg'/>
			</button>
			<span className='number comments-number'>{commentsNumber }</span>
		</div>
	 );
}
 
export default CommentsBtn;