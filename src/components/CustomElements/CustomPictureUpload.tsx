import { useState,FC,FormEventHandler } from 'react';
import { PICTURE_PLACEHOLDER } from '../../utils/constants';
import { getFilesAsArray } from '../../utils/getFilesAsArray';
import { PostPicturesCarousel } from '../Post/PostPicturesCarousel';
import AddToPhotosRoundedIcon from '@mui/icons-material/AddToPhotosRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import { SetFormField } from '../UserAccount/CreateNewPostForm';
type CustomPictureUploadProps = {
	placeholderText?: string,
	placeholderPicture?: string,
	className?: string,
	fileUploadID?: string,
	width?:string,
	height?:string,
	pictures?:string[],
	setFormPicturesField: SetFormField
}
type FilesState = {
	files:File[],
	imgBlobs: string[]
}
const CustomPictureUpload:FC<CustomPictureUploadProps> = ({
							placeholderText = "Default placeholder text",
							placeholderPicture,
							className,
							fileUploadID = 'imageUpload',
							width = "100%",
							height,
							pictures,
							setFormPicturesField
							}) => {
	const [filesState,setFilesState] = useState<FilesState>({files:[],imgBlobs:[]});

	const setFilesList: FormEventHandler<HTMLInputElement> = async (e) => {
		const target = e.target as HTMLInputElement;
		const filesArr = getFilesAsArray(target.files as FileList);
		const files:FilesState = {
			files: filesArr,
			imgBlobs: filesArr.map(file => URL.createObjectURL(file as Blob))
		}
		setFormPicturesField('pictures',{value: filesArr})
		setFilesState(files)
	}
	
	return ( 
		<div className={`custom_input-file ${className}`}>
			<div className="custom_input-file-image">
				{
					filesState.imgBlobs.length > 1 ? (
						<PostPicturesCarousel pictures={filesState.imgBlobs}/> 
					):
					filesState.imgBlobs?.length === 1 ?
					<img src={filesState.imgBlobs[0]} alt="img1"/> :
					<img src={PICTURE_PLACEHOLDER} alt="img1"/>
					
				}
				<div className="custom_input-file-wrapper">
					<AddPhotoAlternateRoundedIcon/>
					<input	type="file"
							accept="image/png, image/jpeg" 
							className='custom_input-file'
							title='choose picture'
							id={fileUploadID}
							onInput={setFilesList}
							onChange={(e)=>{console.log(e.target.files)}}
							multiple
							/>
				</div>
			</div>
		</div>
	 );
}
 
export default CustomPictureUpload;