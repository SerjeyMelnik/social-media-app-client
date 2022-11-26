import { FC } from 'react';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
const PostPreloader: FC = () => {
	return ( 
			<div className="post">
				<div className="post_user-info">
					<div className="post_user-avatar preloader"></div>
					<div className="post_user-detail">
						<h2 className="post_user-name preloader"></h2>
						<p className='post_user-posted-date preloader'></p>
					</div>
				</div>
				<div className="post_content">
					<p className="post_content-description preloader">
						<span className='line preloader'></span>
						<span className='line preloader'></span>
						<span className='line preloader'></span>
					</p>
					<div className="post_content-picture preloader"></div>
				</div>
				<div className="post_info">
					<div className="like_btn-wrapper ">
						<button className='like_btn post_button'> 
							<FavoriteBorderRoundedIcon className='like_btn-svg post_button-svg'/>
						</button>
						<span className='number like-number'>0</span>
					</div>
					<div className="comments_btn-wrapper"> 
						<button className="comments_btn post_button" title='comments'>
							<ChatRoundedIcon className='comments_btn-svg post_button-svg'/>
						</button>
						<span className='number comments-number'>0</span>
					</div>
				</div>
			</div>
	 );
}
 
export default PostPreloader;