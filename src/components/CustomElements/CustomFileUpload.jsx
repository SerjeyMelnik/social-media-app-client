import React, { useState } from 'react';

const CustomFileUpload = ({	placeholder = "Default placeholder",
							value = '',
							deafaultImg = 'http://localhost:3080/placeholder-image.png',
							className = '',
							setValue = Function,
							fileUploadID = 'imageUpload',
							imgBgColor = '#1f3f42'
							}) => {
								
	const background = (img,color) => {
		return `url(${img}) ${color} center center /  contain no-repeat`;
	}
	const defaultImgStyle = {
		background: background(deafaultImg,imgBgColor)
	}
	const [postImgStyle,setPostImgStyle] = useState(defaultImgStyle);
	const changeImg = (e) => {
		const img = e.target.files[0];
		const imgURL = URL.createObjectURL(img);
		setPostImgStyle({background: background(imgURL,imgBgColor)})
		setValue(img)
	}
	return ( 
		<div className={`custom_input-file ${className}`}>
			
			<div className="custom_input-file-image"
				style={postImgStyle}>
				<label htmlFor={fileUploadID} className='button button-image-upload'>
					Choose image
				</label>
				{/* <img src={postImg} /> */}
			</div>

			<input	type="file"
					accept="image/png, image/jpeg" 
					className='custom_input-file-field'
					id={fileUploadID}
					onInput={changeImg}
					onChange={(e)=>{console.log(e.target.files)}}
					multiple
					/>
		</div>
	 );
}
 
export default CustomFileUpload;