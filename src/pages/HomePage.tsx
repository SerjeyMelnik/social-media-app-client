import  {  FC } from 'react';
import FilteredPosts from '../components/Post/FilteredPosts';

const HomePage: FC = () => {
	return (
		<main className='page home-page'>
			
				<div className="posts_container">
					<FilteredPosts postsType='all_posts'/>
				</div>
		</main> 
		
	 );
}
 
export default HomePage;