import { UserShort } from "../types/userTypes";

type TIsCurrentUserLikedPost = (likesOfPost:UserShort[],currentUserId:string) => boolean;

export const isCurrentUserLikedPost:TIsCurrentUserLikedPost = (likesOfPost:UserShort[],currentUserId:string) => {
	const isCurrUserLikedPost = likesOfPost.find(user => user.userID === currentUserId);
	return Boolean(isCurrUserLikedPost);
}