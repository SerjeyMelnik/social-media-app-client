import {  IComment, IPost, IUser } from "../types/types";
import axios from 'axios'
import React from "react";
const API_URL = 'https://jsonplaceholder.typicode.com';
const API_URL_posts = '/posts';
const API_URL_users = '/users';
const API_URL_comments = '/comments';

 const  useFetchData = () => {
	
	const getUser = async (userId: number) => {
		const url = API_URL + API_URL_users + `/${String(userId)}`;
		const response = await axios.get<IUser>(url);
		return response.data;
	}
	const getUsers = async () => {
		const url = API_URL + API_URL_users;
		const response = await axios.get<IUser[]>(url);
		return response.data;
	}
	const getCommentsToPost = async (postId: number) => {
		const url = API_URL + API_URL_comments + `?postId=${String(postId)}`;
		const response = await axios.get<IComment[]>(url);
		return response.data;
	}	
	

	const getPosts = async (setState: React.Dispatch<React.SetStateAction<IPost[]>>) => {
		const url = API_URL + API_URL_posts;
		const response = await axios.get<IPost[]>(url);
		setState(response.data)
		//return posts.data;
	}
	const getPost = async () => {

	}

	return {
		 getUser,
		 getUsers,
		 getCommentsToPost,
		 getPosts,
		// getPost
	}
} 

export default useFetchData;