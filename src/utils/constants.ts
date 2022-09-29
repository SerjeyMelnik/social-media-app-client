

export enum EDisplayBlok{
	account_info='account_info', 
	edit_account='edit_account', 
	favorite ='favorite'
}
export type TDisplayBlok = keyof typeof EDisplayBlok;

export type T_USER_ACCOUNT_MANAGE_BUTTON = {
	text:string,
	id: TDisplayBlok
}

export const USER_ACCOUNT_MANAGE_BUTTONS:T_USER_ACCOUNT_MANAGE_BUTTON[] = [
	{text:"Info",id: EDisplayBlok.account_info},
	{text:"Edit Account", id: EDisplayBlok.edit_account},
	{text:"Favorite",id: EDisplayBlok.favorite}
]