import { UserShort } from "../types/userTypes";

type TIsCurrentUserLikedPost = (likesOfPost:UserShort[],currentUserId:string) => boolean;

export const isCurrentUserLikedPost:TIsCurrentUserLikedPost = (likesOfPost:UserShort[],currentUserId:string) => {
	const isCurrUserLikedPost = likesOfPost.filter(user => user.userID === currentUserId).length === 1;
	return isCurrUserLikedPost;
}