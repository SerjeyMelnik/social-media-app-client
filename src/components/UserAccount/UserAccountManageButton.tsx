import React,{FC} from 'react'
import { T_USER_ACCOUNT_MANAGE_BUTTON,TDisplayBlok } from '../../utils/constants'


export type TUserAccountManageButtonProps = {
	button: T_USER_ACCOUNT_MANAGE_BUTTON,
	setDisplayBlock: React.Dispatch<React.SetStateAction<TDisplayBlok>>,
	displayBlock: TDisplayBlok
}
const UserAccountManageButton:FC<TUserAccountManageButtonProps> = ({button,displayBlock,setDisplayBlock}) => {
	const onClickHandler = () => {
		setDisplayBlock(button.id)
	}
	return (
		<div className={`user-account-manage-button ${displayBlock === button.id ? 'active':''}`} onClick={onClickHandler}>
			<span className='text'>{button.text}</span>
		</div>
	)
}
export default UserAccountManageButton;