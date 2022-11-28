import { TUserShortDataNeedsToFill } from "../types/userTypes";


export enum EDisplayBlok{
	account_info='account_info', 
	edit_account='edit_account', 
	favorites ='favorites',
	my_posts = 'my_posts'
}
export type TDisplayBlok = keyof typeof EDisplayBlok;

export type T_USER_ACCOUNT_MANAGE_BUTTON = {
	text:string,
	id: TDisplayBlok
}

export const USER_ACCOUNT_MANAGE_BUTTONS:T_USER_ACCOUNT_MANAGE_BUTTON[] = [
	{text:"Info",id: EDisplayBlok.account_info},
	{text:"Edit Account", id: EDisplayBlok.edit_account},
	{text:"Favorites",id: EDisplayBlok.favorites},
	{text:"My posts",id:EDisplayBlok.my_posts}
]

export const USER_PLACEHOLDER_IMG = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'; 

export const USER_DATA_NEEDS_TO_FILL :TUserShortDataNeedsToFill = ['firstName','lastName','userName'];

export type Collections = 'comments' | 'posts' | 'users-full' | 'users-short';

