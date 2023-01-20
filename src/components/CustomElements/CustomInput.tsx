import React, { ChangeEvent, FC, SyntheticEvent } from 'react';
import { useState } from 'react';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
type TCustomInputProps = {
	placeholder: string,
	name: string ,
	label?: string,
	type: string ,
	value?: string | undefined | null  ,
	className?: string,
	error?: string,
	disabled?: boolean,
	required?: boolean,
	changeFieldValue: React.ChangeEventHandler<HTMLInputElement> 
}
const CustomInput: FC<TCustomInputProps> = (props) => {
	const {
		placeholder = "Default placeholder",
		name = 'field-name',
		label ,
		type = 'text', 
		value = '' ,
		className = '', 
		changeFieldValue, 
		error = '',
		disabled,
		required
        } = props;
	const [isShowPassword,setIsShowPassword] = useState(false);
	
	
		if(type === 'password'){
		return(
			<div className="input-wrapper">
				{
					label && <label htmlFor="" className='input-label'>{label}</label>
				}
				<div className="input-password-wrapper">
					<input  type={!isShowPassword ? type : 'text'}
							placeholder={placeholder}
							className={`input input-${name} ${error.length ? 'error' : ''} ${className}`}
							name={name} 
							value={value ? value : ''}
							onChange={changeFieldValue}
							data-error-msg={error}
							disabled={disabled}
							/>
					{ !isShowPassword ? 
						<VisibilityOffRoundedIcon className='show-pass-button' onClick={()=>{setIsShowPassword(state => !state)}}/> :
						<VisibilityRoundedIcon className='show-pass-button' onClick={()=>{setIsShowPassword(state => !state)}}/>
					}
				</div>
				<span className='input-error-msg'>{error}</span>
			</div>
		)
	}
	return ( 
		<div className="input-wrapper">
			{
				label && <label htmlFor="" className={`input-label ${required ? 'required' : ''}`}>{label}</label>
			}
			<input  type={type}
					placeholder={placeholder}
					className={`input input-${name} ${error.length ? 'error' : ''} ${className}`}
					name={name} 
					value={value ? value : ''}
					onChange={changeFieldValue}
					data-error-msg={error}
					disabled={disabled}
					/>
			<span className='input-error-msg'>{error}</span>
		</div>
	 );
}
 
export default CustomInput;