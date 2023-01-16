import  { FC, useState } from 'react';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useUserContext } from '../../hooks/useUserContext';
import { isCurrentUserLikedPost } from '../../utils/isCurrentUserLikedPost';
import { toggleLikeToPost } from '../../firebase/firestore/likeAndCommentOperation';
import { useNavigate } from 'react-router-dom';
import { UserShort } from '../../types/userTypes';
import { useAuthProvider } from '../../context-providers/AuthProvider';
type TLikeBtnProps = {
	postLikes: UserShort[],
	postId: string
}
const LikeBtn:FC<TLikeBtnProps> = ({postLikes,postId}) => {
	const {currentUser,isUserAuthenticated} = useAuthProvider();
	const [loading,setLoading] = useState(false)
	const isLikedDefault = isUserAuthenticated && isCurrentUserLikedPost(postLikes,currentUser?.uid as string);
	const navigateTo = useNavigate();
	
	const [isLiked,setIsLiked] = useState(isLikedDefault);
	const toggleLike = async () => {
		if(!isUserAuthenticated){
			navigateTo('/login')
			console.log('you need log in');
			return;
		}
		setLoading(true)
		await toggleLikeToPost(postId,postLikes,currentUser?.uid as string)
		setLoading(false)
		setIsLiked((state)=> !state)
	}
	return ( 
		<div className="like_btn-wrapper ">
			<button className='like_btn post_button' onClick={toggleLike} disabled={loading} title={isLiked ? 'unlike' : 'like'}> 
					{	
						!isLiked 
						?
						<FavoriteBorderRoundedIcon className='like_btn-svg post_button-svg'/>
						:
						<FavoriteRoundedIcon className='like_btn-svg post_button-svg' />
					}
					
			</button>
			<span className='number like-number'>{postLikes.length}</span>
		</div>
	 );
}
 
export default LikeBtn;