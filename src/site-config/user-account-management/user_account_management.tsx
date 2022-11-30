
export enum EDisplayBlok{
	account_info='account_info', 
	edit_account='edit_account', 
	favorites ='favorites',
	my_posts = 'my_posts',
	create_post = 'create_post'
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
	{text:"My posts",id:EDisplayBlok.my_posts},
	{text:"Create post",id:EDisplayBlok.create_post}
]
