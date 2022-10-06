import {  UserShort } from "./userTypes";

export interface PostFirebase {
	author:UserShort,
	type:'post_without_img' | 'post_with_img' | 'post_with_slider',
	description: string,
	slider?: string[],
	picture?:string,

}