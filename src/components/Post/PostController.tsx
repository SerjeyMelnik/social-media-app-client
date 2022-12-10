import {FC,useState} from 'react'
import { removePost } from '../../firebase/firestore/postOperation';

type PostControllerProps = {
	postId: string
}
export const PostController:FC<PostControllerProps> = ({postId}) => {
	const [showPopup,setShowPopup] = useState(false);
	const deletePost = async () => {
		await removePost(postId);
	}
	return (
		<div className="post-controller">
			<div className="post-controller-dots" onClick={()=>{setShowPopup(state => !state)}}>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<div className={`post-controller-popup ${showPopup ? 'show' : 'hide'}`}>
				<span className="post-controller-popup-item delete" onClick={deletePost}>
					Delete post
				</span>
				<span className="post-controller-popup-item edit">
					Edit post
				</span>
				<span className="post-controller-popup-item archive">
					Archive post
				</span>
				
			</div>
		</div>
	)
}