import {  DocumentReference, getDoc } from "firebase/firestore";
import { IPost } from "../../types/postTypes";
import { IComment } from "../../types/commentTypes";
import { getCollection } from "./getOperation"
import { UserShort } from "../../types/userTypes";



export const getAllPosts = async () => {
	const posts_conllections = await getCollection('posts');
	const postsPromises = posts_conllections.docs
							.map(item=>item.data() as IPost)
							.map(async (post) => await getPost(post));
	const posts =  await Promise.all(postsPromises);
	return posts;
}
export const getPost = async (post: IPost) => {
	
	return {
		...post,
		author: await getAuthor(post.author),
		comments: await getCommentsToPost(post.comments),
		likes: await getUsersWhoLiked(post.likes)
	};
}
export const getUserPosts = async (posts: DocumentReference<IPost>[]) => {
	const IPostPromises = posts.map(async (post) => (await getDoc(post)).data());
	const userIPostsData = await Promise.all(IPostPromises);
	const userPostsPromises = userIPostsData.map(async (post) => await getPost(post as IPost));
	const userPosts = await Promise.all(userPostsPromises)
	return userPosts;
}
export const getCommentsToPost = async (comments: DocumentReference<IComment>[]) => {
	const ICommentsPromises = comments.map(async (commentRef) => {
		const docSnap = await getDoc<IComment>(commentRef);
		return docSnap.data();
	})
	const TCommentsData = await Promise.all(ICommentsPromises);
	const TCommentsPromises = TCommentsData.map(async (comment) => 
		await getComment(comment as IComment)
	)
	const commentsData = await Promise.all(TCommentsPromises) 
	return commentsData;
}
const getComment = async (comment: IComment) => {
	return {
		...comment,
		author: await getAuthor(comment.author),
		likes: await getUsersWhoLiked(comment.likes)
	}
}
export const getAuthor = async (authorRef: DocumentReference<UserShort>) => {
	const authorSnap = await getDoc<UserShort>(authorRef);
	return authorSnap.data() as UserShort;
}
export const getUsersWhoLiked = async (usersRefs: DocumentReference<UserShort>[]) => {
	const usersWhoLikedPromises = usersRefs.map(async (userRef) => await getAuthor(userRef));
	const usersWhoLiked = await Promise.all(usersWhoLikedPromises);
	return usersWhoLiked;
}