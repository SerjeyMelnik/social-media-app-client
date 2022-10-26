import { arrayRemove, arrayUnion, doc } from "firebase/firestore";
import { UserShort } from "../../types/userTypes";
import { isCurrentUserLikedPost } from "../../utils/isCurrentUserLikedPost";
import { db } from "../firebase";
import { updateDocumentField } from "./updateOperation";


export const toggleLikeToPost = async (postId: string,likesOfPost:UserShort[],currentUserId: string) => {

	const isCurrUserLikedPost = isCurrentUserLikedPost(likesOfPost,currentUserId);
	if (isCurrUserLikedPost){

		await updateDocumentField('posts',postId,'likes',arrayRemove(doc(db,`users-short/${currentUserId}`)))
		console.log('deleted like');
		
	}
	else {
		await updateDocumentField('posts',postId,'likes',arrayUnion(doc(db,`users-short/${currentUserId}`)))

	}
	
}