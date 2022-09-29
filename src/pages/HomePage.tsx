import React, { useState, FC, useEffect } from 'react';
import Post from '../components/Post/Post';
import useFetchData from '../fakeAPI/useFetchData';
import { useUserContext } from '../hooks/useUserContext';
import { IPost, IUser } from '../types/types';

const HomePage: FC = () => {
	const [posts,setPosts] = useState<IPost[]>([]);
	const {getPosts} = useFetchData();

	useEffect( ()=>{

		getPosts().then(data => setPosts(data))
	},[]);
	
	return (
		<main className='page home-page'>
				<div className="posts_container">
					{
						posts?.length && posts.map((post: IPost) => {
							return <Post post={post} key={String(post.id)}/>
						}) 
					}
					
				</div>
		</main> 
		
	 );
}
 
export default HomePage;