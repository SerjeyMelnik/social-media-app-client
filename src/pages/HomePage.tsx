import  {  FC } from 'react';
import FilteredPosts from '../components/Post/FilteredPosts';
import { useChatsContext } from '../context-providers/ChatsContextProvider';

const HomePage: FC = () => {
	const {isChatOpen} = useChatsContext()
	return (
		<main className={`page home-page `}>
			
				<div className="posts_container">
					<FilteredPosts postsType='all_posts'/>
				</div>
		</main> 
		
	 );
}
 
export default HomePage;