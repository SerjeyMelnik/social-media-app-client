import {FC} from 'react'

type TUserInfoLineProps = {
	property:string,
	value: string | undefined | null 
}

const UserInfoLine:FC<TUserInfoLineProps> = ({property,value}) => {
	if(!value){
		return null;
	}
	return (
		<div className="user_info_line">
				<span className='user_info_line-property'>
					{property}: 
				</span>
				<span className='user_info_line-value'>
					{value}
				</span>
		</div>
	)
}
export default UserInfoLine;