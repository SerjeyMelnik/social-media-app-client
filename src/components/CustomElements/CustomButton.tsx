import React, {FC} from 'react'

interface ICustomButtonProps {
	className?: string,
	onClickFunc?: () => void,
	children?:  React.ReactNode,
	type?: "button" | "submit" | "reset",
	isDisabled?: boolean
}

const CustomButton : FC<ICustomButtonProps> = ({className,isDisabled, onClickFunc , children, type = 'button' }) => {
	return ( 
		<button className={`button ${className}`}
				onClick={onClickFunc}
				type={type}
				disabled={isDisabled}
				>
		{children}
		</button>
	 );
}
 
export default CustomButton;