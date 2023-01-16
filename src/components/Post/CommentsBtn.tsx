import React, {FC} from 'react';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import { useNavigate } from 'react-router-dom';
import { useAuthProvider } from '../../context-providers/AuthProvider';
type CommentsBtnProps = {
	setShowPostComments: React.Dispatch<React.SetStateAction<boolean>>,
	commentsNumber: number,
	isCommentsShown: boolean
}
const CommentsBtn: FC<CommentsBtnProps> = ({setShowPostComments,commentsNumber,isCommentsShown}) => {
	const {isUserAuthenticated} = useAuthProvider()
	const navigateTo  = useNavigate()
	const toggleComments = () => {
		if(!isUserAuthenticated){
			navigateTo('/login')
			console.log('you need log in');
			return;
		}
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