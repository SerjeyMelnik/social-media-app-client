import React, { useState } from 'react';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

const LikeBtn = () => {
	const [isLiked,setIsLiked] = useState(false);
	const toggleLike = () => {
		setIsLiked((state)=> !state)
	}
	return ( 
		<div className="like_btn-wrapper ">
			<button className='like_btn post_button' onClick={toggleLike} title={isLiked ? 'unlike' : 'like'}> 
					{	
						isLiked 
						?
						<FavoriteBorderRoundedIcon className='like_btn-svg post_button-svg'/>
						:
						<FavoriteRoundedIcon className='like_btn-svg post_button-svg' />
					}
					
			</button>
			<span className='number like-number'>15</span>
		</div>
	 );
}
 
export default LikeBtn;