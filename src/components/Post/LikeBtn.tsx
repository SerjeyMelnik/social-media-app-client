import  { FC, useState } from 'react';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useUserContext } from '../../hooks/useUserContext';
import { isCurrentUserLikedPost } from '../../utils/isCurrentUserLikedPost';
import { toggleLikeToPost } from '../../firebase/firestore/likeAndCommentOperation';
import { useNavigate } from 'react-router-dom';
import { UserShort } from '../../types/userTypes';
type TLikeBtnProps = {
	postLikes: UserShort[],
	postId: string
}
const LikeBtn:FC<TLikeBtnProps> = ({postLikes,postId}) => {
	const {isUserAuthenticated,userInfo} = useUserContext();
	const isLikedDefault = isUserAuthenticated && isCurrentUserLikedPost(postLikes,userInfo?.userAuthInfo?.uid as string);
	const navigateTo = useNavigate();
	
	const [isLiked,setIsLiked] = useState(isLikedDefault);
	
	const toggleLike = async () => {
		if(!isUserAuthenticated){
			navigateTo('/login')
			console.log('you need log in');
			return;
		}
		await toggleLikeToPost(postId,postLikes,userInfo?.userAuthInfo?.uid as string)
		setIsLiked((state)=> !state)
	}
	return ( 
		<div className="like_btn-wrapper ">
			<button className='like_btn post_button' onClick={toggleLike} title={isLiked ? 'unlike' : 'like'}> 
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