import { arrayRemove, arrayUnion, collection, doc, serverTimestamp,addDoc, updateDoc, Timestamp} from "firebase/firestore";
import { UserShort } from "../../types/userTypes";
import { isCurrentUserLikedPost } from "../../utils/isCurrentUserLikedPost";
import { db } from "../firebase";
import { getDocRef } from "./getOperation";
import { updateDocumentField } from "./updateOperation";


export const toggleLikeToPost = async (postId: string,likesOfPost:UserShort[],currentUserId: string) => {

	const isCurrUserLikedPost = isCurrentUserLikedPost(likesOfPost,currentUserId);
	if (isCurrUserLikedPost){
		await updateDocumentField('posts',postId,'likes',arrayRemove(getDocRef('users-short',currentUserId)));
	}
	else {
		await updateDocumentField('posts',postId,'likes',arrayUnion(doc(db,`users-short/${currentUserId}`)));
	}
	
}

export const addComment = async (commnetBody: string,postId:string,authorId:string) => {
	const comment = {
		author: doc(db,`users-short/${authorId}`),
		body:commnetBody,
		likes:[],
		postedDate: serverTimestamp(),
		postId
	}
	const newDocRef = await addDoc(collection(db,'comments'),comment);
	await updateDoc(newDocRef,{id:newDocRef.id})
	await updateDocumentField('posts',postId,'comments',arrayUnion(newDocRef))
}	