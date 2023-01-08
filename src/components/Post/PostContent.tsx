import {FC} from 'react';
import { PostPicturesCarousel } from './PostPicturesCarousel';

type PostContentProps = {
	description: string,
	pictures?: string[],
}
const PostContent:FC<PostContentProps> = ({description,pictures}) => {
	return (
	<div className="post_content">
		<p className="post_content-description">
			{description}
		</p>
		{
			(pictures?.length !== 0 && pictures) &&
			<div className="post_content-picture">
				{
					pictures && (pictures.length === 1 ?
					<img src={pictures[0]} alt="post pocture" className='post_content-picture-img' loading='lazy'/> :
					pictures.length > 1 && <PostPicturesCarousel pictures={pictures}/>
					)
				}
			</div>
		}
		
	</div>
);
}
 
export default PostContent;