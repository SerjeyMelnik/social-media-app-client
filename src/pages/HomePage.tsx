import React, { useState, FC, useEffect } from 'react';
import Post from '../components/Post/Post';
import useFetchData from '../fakeAPI/useFetchData';
import { IPost, IUser } from '../types/types';

const HomePage: FC = () => {
	const [posts,setPosts] = useState<IPost[]>([]);
	const {getPosts} = useFetchData();
	useEffect( ()=>{
		getPosts(setPosts)
	},[]);
	
	return (
		<main className='home-page'>
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