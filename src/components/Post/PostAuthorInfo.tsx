import {FC} from 'react'
import { Timestamp } from "firebase/firestore"
import { UserShort } from "../../types/userTypes"
import { getDate } from '../../utils/getDate'
import { useUserContext } from '../../hooks/useUserContext'
import { PostController } from './PostController'
import { Link } from 'react-router-dom'
import { USER_PLACEHOLDER_IMG } from '../../utils/constants'
import { useAuthProvider } from '../../context-providers/AuthProvider'

type PostAuthorInfoProps = {
	author: UserShort,
	postedDate: Timestamp,
	postId: string,
}
export const PostAuthorInfo:FC<PostAuthorInfoProps> = ({author,postedDate,postId}) => {
	const {currentUser} = useAuthProvider();
	const stringDate = getDate(postedDate)?.stringDate;
	return (
		<div className="post_user-info">
			<div className="post_user-avatar">
				<Link to={`/${author.userID}`} >
					<img src={author?.avatar || USER_PLACEHOLDER_IMG} alt="post pocture"  className='post_user-avatar-img'/>
				</Link>				
			</div>
			<div className="post_user-detail">
				<h2 className="post_user-name">
					<Link to={`/${author.userID}`} className='main-link'>
						{author.userName}
					</Link>
				</h2>
				<p className='post_user-posted-date'>{stringDate}</p>
			</div>
			{
				author.userID === currentUser?.uid && 
				<PostController postId={postId}/>
			}
		</div>
	)
}