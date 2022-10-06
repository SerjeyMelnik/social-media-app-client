import {FC,useState,ChangeEventHandler} from 'react'
import CustomInput from '../CustomElements/CustomInput';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import {  TUserShortField } from '../../types/userTypes';
import { useUserContext } from '../../hooks/useUserContext';
import { updateShortUserField } from '../../firebase/firestore/userOperation';
import LoaderSpiner from '../CustomElements/LoaderSpiner';

type TUserInfoLineEditProps = {
	name:TUserShortField,
	label:string,
	value?: string | undefined | null 
}

const UserInfoLineEdit:FC<TUserInfoLineEditProps> = ({name,label,value}) => {
	const {userInfo} = useUserContext()
	const [isEdit,setIsEdit] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [fieldValue,setFieldValue] = useState<string | undefined | null >(value);
	const toggleEdit = () => {
		setIsEdit(state => !state)
	}
	const saveEditedUserInfo = async () => {
		toggleEdit();
		setLoading(state => !state)
		await updateShortUserField(userInfo?.userAuthInfo?.uid as string,name,fieldValue as string)
		setLoading(state => !state) 
	}
	const  changeFieldValue:ChangeEventHandler<HTMLInputElement> = (e) => {
		setFieldValue(e.target.value)
	}
	return (
		<div className="user_info_line editable">
				<label className='user_info_line-property'>
					{label}<span style={{color:'red'}}>*</span>: 
				</label>
				<CustomInput type = 'text'
							name = {name}
							value = {fieldValue}
							placeholder = {`Please fil out this field`}
							changeFieldValue = { changeFieldValue }
							className='input-editable'
							disabled={!isEdit}

								/>
				{
					!isEdit ?

					<span className='user_info_line_edit_button edit' onClick={toggleEdit}>
						<EditRoundedIcon />
					</span> :

					<span className={`user_info_line_edit_button save ${loading ? 'disabled' : ''}`} onClick={saveEditedUserInfo}>
						{
							loading ? 
							<LoaderSpiner/>:
							<CheckRoundedIcon/>
						}
					</span>
						
				}				
		</div>
	)
}
export default UserInfoLineEdit;