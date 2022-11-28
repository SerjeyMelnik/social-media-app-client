import  { useState, FC, useEffect } from 'react';
import { PostsList } from '../components/Post/PostsList';
import { getAllPosts } from '../firebase/firestore/postOperation';
import { TPost } from '../types/postTypes';
const HomePage: FC = () => {
	const [posts,setPosts] = useState<TPost[]>([]);
	
	useEffect( ()=>{
		getAllPosts().then(data => setPosts(data)).catch(e => console.error(e))
	},[]);
	
	return (
		<main className='page home-page'>
				<div className="posts_container">
					<PostsList posts={posts}/>
				</div>
		</main> 
		
	 );
}
 
export default HomePage;