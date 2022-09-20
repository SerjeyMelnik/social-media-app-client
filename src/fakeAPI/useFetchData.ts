import {  IComment, IPost, IUser } from "../types/types";
import axios from 'axios'
import React from "react";
const API_URL = 'https://jsonplaceholder.typicode.com';
const API_URL_posts = '/posts';
const API_URL_users = '/users';
const API_URL_comments = '/comments';

type useFetchDataHook = {
	getUser: (userId: number) => Promise<IUser>,
	getUsers: () => Promise<IUser[]>,
	getCommentsToPost: (postId: number) => Promise<IComment[]>,
	getPosts: () => Promise<IPost[]>
}

 const  useFetchData = (): useFetchDataHook => {
	
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
	

	const getPosts = async () => {
		const url = API_URL + API_URL_posts;
		const response = await axios.get<IPost[]>(url);
		return response.data;
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