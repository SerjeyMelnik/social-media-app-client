import {FC} from 'react'
import { Timestamp } from "firebase/firestore"
import { UserShort } from "../../types/userTypes"
import { getDate } from '../../utils/getDate'
import { useUserContext } from '../../hooks/useUserContext'
import { PostController } from './PostController'

type PostAuthorInfoProps = {
	author: UserShort,
	postedDate: Timestamp,
	postId: string
}
export const PostAuthorInfo:FC<PostAuthorInfoProps> = ({author,postedDate,postId}) => {
	const {userInfo} = useUserContext()
	const stringDate = getDate(postedDate)?.stringDate;
	return (
		<div className="post_user-info">
			<div className="post_user-avatar">
				<img src={author?.avatar} alt="post pocture"  className='post_user-avatar-img'/>
			</div>
			<div className="post_user-detail">
				<h2 className="post_user-name">{author.userName}</h2>
				<p className='post_user-posted-date'>{stringDate}</p>
			</div>
			{
				author.userID === userInfo?.userAuthInfo?.uid && 
				<PostController postId={postId}/>
			}
		</div>
	)
}