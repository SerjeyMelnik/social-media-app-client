import React from 'react';
import { useState } from 'react';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
const CustomInput = (props) => {
	const {
		placeholder = "Default placeholder",
		name = 'field-name',
		label = '',
		type = 'text', 
		value = '' ,
		className = '', 
		changeFieldValue = Function, 
		error = ''} = props;
	const [isShowPassword,setIsShowPassword] = useState(false);
	
	
		if(type === 'password'){
		return(
			<div className="input-wrapper">
				<label htmlFor="" className='input-label'>{label}</label>
				<div className="input-password-wrapper">
				<input  type={!isShowPassword ? type : 'text'}
						placeholder={placeholder}
						className={`input input-${name} ${className}`}
						name={name} 
						value={value}
						onChange={changeFieldValue}/>
				{ !isShowPassword ? 
					<VisibilityOffRoundedIcon className='show-pass-button' onClick={()=>{setIsShowPassword(state => !state)}}/> :
					<VisibilityRoundedIcon className='show-pass-button' onClick={()=>{setIsShowPassword(state => !state)}}/>
				}
				</div>
				<span className='input-error'>{error}</span>
			</div>
		)
	}
	return ( 
		<div className="input-wrapper">
			<label htmlFor="" className='input-label'>{label}</label>
			<input  type={type}
					placeholder={placeholder}
					className={`input input-${name} ${className}`}
					name={name} 
					value={value}
					onChange={changeFieldValue}
					/>
			<span className='input-error'>{error}</span>
		</div>
	 );
}
 
export default CustomInput;