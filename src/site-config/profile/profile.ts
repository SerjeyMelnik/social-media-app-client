export type ProfileInfoBlocksId = 'main-info' | 'friends'
export type ProfileInfoBlocksType = {
	title: string,
	id: ProfileInfoBlocksId,
}
export const PROFILE_INFO_BLOCKS:ProfileInfoBlocksType[] = [ 
	{
		title: 'Main info',
		id: 'main-info',
	},
	{
		title: 'Friends',
		id: 'friends',
	}
]