import React, {FC} from 'react'

interface ICustomButtonProps {
	className?: String,
	onClickFunc?: () => void,
	children:  React.ReactNode,
	type?: "button" | "submit" | "reset" | undefined
}

const CustomButton : FC<ICustomButtonProps> = ({className = "", onClickFunc = () => {console.log('func not declared')} , children, type = 'button' }) => {
	return ( 
		<button className={`button ${className}`}
				onClick={onClickFunc}
				type={type}
				>
		{children}
		</button>
	 );
}
 
export default CustomButton;