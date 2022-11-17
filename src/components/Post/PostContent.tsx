import {FC} from 'react';

type PostContentProps = {
	description: string,
	pictures?: string[]
}
const PostContent:FC<PostContentProps> = ({description,pictures}) => {
	return (
	<div className="post_content">
		<p className="post_content-description">
			{description}
		</p>
		<div className="post_content-picture">
			{
				pictures && (pictures.length === 1 ?
				<img src={pictures[0]} alt="post pocture" className='post_content-picture-img'/> :
				pictures?.length > 1 && 'there will be slider'
				)
			}
		</div>
	</div>
);
}
 
export default PostContent;