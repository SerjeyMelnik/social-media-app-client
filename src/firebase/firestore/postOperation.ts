import {  addDoc, collection, DocumentReference, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { IPost } from "../../types/postTypes";
import { IComment } from "../../types/commentTypes";
import { getCollection } from "./getOperation"
import { UserShort } from "../../types/userTypes";
import { TWhereProps ,getFilteredColection, getDocRef} from "../firestore/getOperation"
import { uploadFile } from "../storage/uploadFile";
import { db } from "../firebase";
import { deleteDocument } from "./deleteOperation";


export const getAllPosts = async () => {
	const posts_conllections = await getCollection('posts');
	const posts =  await Promise.all(
		posts_conllections.docs
		.map( (post) => getPost(post.data() as IPost)));
	return posts;
}
export const getAllPostsId = async () => {
	const posts_conllections = await getCollection('posts');
	return posts_conllections.docs.map(doc => doc.id)
}

export const getAllPostsCollection = async () => {
	const posts_conllection = await getCollection('posts')
	return posts_conllection.docs;
}
export const getPost = async (post: IPost) => {
	return {
		...post,
		author: await getAuthor(post.author),
		comments: await getCommentsToPost(post.comments),
		likes: await getUsersWhoLiked(post.likes)
	};
}

export const getCommentsToPost = async (comments: DocumentReference<IComment>[]) => {
	if (!comments || !comments.length) return [];
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
	if (!usersRefs || !usersRefs.length) return [];
	const usersWhoLikedPromises = usersRefs.map(async (userRef) => await getAuthor(userRef));
	const usersWhoLiked = await Promise.all(usersWhoLikedPromises);
	return usersWhoLiked;
}

export const getFilteredPosts = async (whereProps: TWhereProps) => {
	const postsDocs = await getFilteredColection('posts',whereProps);
	const posts = await Promise.all(
		postsDocs.docs.map(post => getPost(post.data() as IPost)))
	return posts;
}

export const getFilteredPostsId = async (whereProps: TWhereProps) => {
	const postsDocs = await getFilteredColection('posts',whereProps);
	return postsDocs.docs.map(doc => doc.id);
}
export const getPostsByAuthorId = async (authorId:string) => {
	const whereProps:TWhereProps = {
		fieldPath: 'author',
		opStr: '==',
		value: getDocRef('users-short',authorId)
	}
	const postsId = await getFilteredPostsId(whereProps);
	return postsId;
}

export const getPostsWhichUserLiked = async (userId: string) => {
	const whereProps:TWhereProps = {
		fieldPath: 'likes',
		opStr: 'array-contains',
		value: getDocRef('users-short',userId)}
	const postsId = await getFilteredPostsId(whereProps);
	return postsId;
}


export const setNewPost = async (postData: { pictures?: File[], description?: string }, userId: string, ) => {

	const newPost = {
		author: getDocRef('users-short', userId),
		comments: [],
		description: postData.description as string,
		pictures: [],
		likes: [],
		postedDate: serverTimestamp(),
	}
	const newDocRef = await addDoc(collection(db,'posts'),newPost);
	
	const uploadPictures = async (file: File) => {
		return await uploadFile(file,`posts/${newDocRef.id}/${file?.name}`)
	}
	const promises = postData.pictures?.map(file => uploadPictures(file)) ;
	const picturesSrc = promises && await Promise.all(promises);
	await updateDoc(newDocRef,{	
			id:newDocRef.id,
			pictures: picturesSrc
		})
	return newDocRef;
}

export const removePost = async (postId: string) => {
 	await deleteDocument("posts",postId)
}