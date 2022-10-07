import { doc, DocumentReference, getDoc } from "firebase/firestore";
import { IPost } from "../../types/postTypes";
import { getCollection, getDocument } from "./getOperation"



export const getAllPosts = async () => {
	const posts_conllections = await getCollection('posts');
	// const posts = posts_conllections.docs.map(
	// 	(post: IPost) => {
	// 		post
	// 	}
	// )
}
export const getPost = async () => {

}
export const getCommentsToPost = async (comments: DocumentReference[]) => {
	const commentsToPostData = comments.map(async (comment) => {
		const docSnap = await getDoc(comment) 
		const commentData = docSnap.data()
		return commentData;
	})
	return commentsToPostData;
}

export const getAuthorToPost = async (authorRef: DocumentReference) => {
	const authorSnap = await getDoc(authorRef);
	const authorData = authorSnap.data()
	return authorData;
}
export const getUsersWhoLikedPost = async (usersRefs: DocumentReference[]) => {
	const likesToPostData = usersRefs.map(async (userRef) => {
		const docSnap = await getDoc(userRef) 
		const commentData = docSnap.data()
		return commentData;
	});
	return likesToPostData;
}