import {FC,FormEventHandler,useState,useRef,useEffect} from 'react';
import { USER_PLACEHOLDER_IMG } from '../../utils/constants';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CustomButton from '../CustomElements/CustomButton';
import { useUserContext } from '../../hooks/useUserContext';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { deleteUserAccountImg, updateUser, uploadUserAccountImg } from '../../firebase/firestore/userOperation';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import LoaderSpiner from '../CustomElements/LoaderSpiner';
import { useAuthProvider } from '../../context-providers/AuthProvider';

type TUserAccountImageProps = {
	
}
type TLoading = {
	uploadImg: boolean,
	deleteImg: boolean
}
type TLoadingTypes = keyof TLoading;

const UserAccountImage:FC<TUserAccountImageProps> = () => {
	const {userShort} = useUserContext();
	const {currentUser} = useAuthProvider();
	const inputFileRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File| null | undefined>(undefined);
	const [loading,setLoading] = useState<TLoading>({uploadImg:false,deleteImg:false});
	const [imgSrc,setImgSrc] = useState<string>();

	const toggleLoading = (loadingType: TLoadingTypes) => {
		setLoading(state => {
			return {
				...state,
				[loadingType]: !state[loadingType]
			}
		})
	}
	
	const changeUserAccountImg:FormEventHandler<HTMLInputElement> = async (e) => {
		const target = e.target as HTMLInputElement;
		const fileData =  target.files?.item(0);
		const srcImg = URL.createObjectURL(fileData as Blob);
		setImgSrc(srcImg);
        setFile(fileData);
	}
    const uploadUserAccountImgHandler = async () => {
		toggleLoading('uploadImg')
		const imgUrl = await uploadUserAccountImg(file as File, currentUser?.uid as string);
		await updateUser({photoURL:imgUrl})
		toggleLoading('uploadImg')
		setImgSrc(imgUrl);
		setFile(null)
    };
	const deleteUserAccountImgHandler = async () => {
		toggleLoading('deleteImg')
		await deleteUserAccountImg(currentUser?.uid as string);
		toggleLoading('deleteImg')
		setImgSrc(USER_PLACEHOLDER_IMG);
		setFile(null)
	}
	const formHandler:FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		await uploadUserAccountImgHandler();
		(e.target as HTMLFormElement).reset();	
	}
	useEffect(()=>{},[currentUser,userShort])
	return (
		<div className="user-account-image-wrapper">
			<div className="user-account-image">
				<img src={imgSrc || userShort?.avatar || USER_PLACEHOLDER_IMG} alt="user-img"/>
				<form  onSubmit={formHandler}>
					{
						!file ? 
						<label htmlFor='userChangeImgInput' className='button-add-user-img button-user-img  button' title='Edit your avatar'>
							<EditRoundedIcon />
						</label> :
						<CustomButton className='button-upload-img button-user-img' isDisabled={loading.uploadImg} type='submit'>
							{	
								loading.uploadImg ?
								<LoaderSpiner/> :
								<CheckRoundedIcon/>
							} 
						</CustomButton>
					}
					{
						imgSrc !== USER_PLACEHOLDER_IMG && !file &&
						<CustomButton className='button-delete-img button-user-img' isDisabled={loading.deleteImg} onClickFunc={deleteUserAccountImgHandler}>
							{	
								loading.deleteImg ?
								<LoaderSpiner/> :
								<DeleteForeverRoundedIcon/>
							} 
							
						</CustomButton>
					}
					<input	type="file"
						accept="image/png, image/jpeg" 
						className='input-user-change-img'
						onInput={changeUserAccountImg}
						ref={inputFileRef}
						id='userChangeImgInput'
						multiple
						/>
					
					
				</form>
			</div>
			<h2 className='user-account-username'>{userShort?.userName}</h2>
			
		</div>
	)
}

export default UserAccountImage;