import React from 'react';

const CustomTextArea = 

({placeholder = "Default placeholder" , value = '',className = '', setValue = Function}) => {
	return ( 
		<div className={`custom_textarea ${className}`}>
			<textarea
					className='custom_textarea-field'
					placeholder={placeholder}
					value={value}
					onChange={(e)=>{setValue(e.target.value)}}/>
		</div>
	 );
}
 
export default CustomTextArea;