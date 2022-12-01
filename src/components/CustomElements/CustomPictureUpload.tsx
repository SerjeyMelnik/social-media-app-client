import React, { useState,FC,FormEventHandler } from 'react';
import { PICTURE_PLACEHOLDER } from '../../utils/constants';
import { getFilesAsArray } from '../../utils/getFilesAsArray';

type CustomPictureUploadProps = {
	placeholderText?: string,
	placeholderPicture?: string,
	className?: string,
	fileUploadID?: string,
	width?:string,
	height?:string,
	changePicturesField: (pictures:File[],error?:string) => void
}
const CustomPictureUpload:FC<CustomPictureUploadProps> = ({
							placeholderText = "Default placeholder text",
							placeholderPicture,
							className,
							fileUploadID = 'imageUpload',
							width = "100%",
							height,
							changePicturesField
							}) => {
	const [imgSrc,setImgSrc] = useState<string>(placeholderPicture ?? PICTURE_PLACEHOLDER);
	const [file, setFile] = useState<File | null | undefined>(undefined);

	const changeUserAccountImg: FormEventHandler<HTMLInputElement> = async (e) => {
		const target = e.target as HTMLInputElement;
		changePicturesField(getFilesAsArray(target.files as FileList))
		const fileData =  target.files?.item(0);
		const srcImg = URL.createObjectURL(fileData as Blob);
		setImgSrc(srcImg);
		setFile(fileData);
	}
	
	return ( 
		<div className={`custom_input-file ${className}`}>
			<div className="custom_input-file-image">
				{/* <label htmlFor={fileUploadID} className='button button-image-upload'>
					Choose image
				</label> */}
				<img src={imgSrc} alt="img"/>
				<input	type="file"
					accept="image/png, image/jpeg" 
					className='custom_input-file-field'
					id={fileUploadID}
					onInput={changeUserAccountImg}
					onChange={(e)=>{console.log(e.target.files)}}
					multiple
					/>
			</div>

		


		</div>
	 );
}
 
export default CustomPictureUpload;