import {FC,useState} from 'react'
import { usePostContext } from '../../context-providers/PostContextProvider';
import { getDocRef } from '../../firebase/firestore/getOperation';
import { removePost } from '../../firebase/firestore/postOperation';

type PostControllerProps = {
	postId: string
}
export const PostController:FC<PostControllerProps> = ({postId}) => {
	const {setPostMessage,setIsShowMsg,post} = usePostContext()
	const [showPopup,setShowPopup] = useState(false);
	
	const deletePostHandler = async () => {
		console.log('deleteHand');
		setIsShowMsg(true)
		setPostMessage({
			text: 'Are you sure that you want delete this post?',
			type:'confirm',
			confirmButtonText: 'Delete post',
			cancelButtonText: 'Cancel',
			actionOnConfirm: async () => {
				 setIsShowMsg(false);
				 setTimeout(async ()=>{
					await removePost(postId, post?.comments.map(cmnt=>getDocRef('comments',cmnt.id)) );
				 },1000)
				 
			},
			actionOnCancel: () => {setIsShowMsg(false)},
		})
		setShowPopup(false)
	}
	return (
		<div className="post-controller">
			<div className="post-controller-dots" onClick={()=>{setShowPopup(state => !state)}}>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<div className={`post-controller-popup ${showPopup ? 'show' : 'hide'}`}>
				<span className="post-controller-popup-item delete" onClick={deletePostHandler}>
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