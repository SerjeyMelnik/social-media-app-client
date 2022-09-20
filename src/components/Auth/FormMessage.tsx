import React, { FC, useLayoutEffect, useRef } from 'react';
import { TMessage } from '../RegistrationForm/RegistrationFormWithEmailPassword'
type TFormMessageProps = {
	message: TMessage,
	setMessage: React.Dispatch<React.SetStateAction<TMessage>>
}

const FormMessage: FC<TFormMessageProps> = ({message,setMessage}) => {
	const form_message = useRef<HTMLDivElement>(null);
	
	useLayoutEffect(()=>{
		const msgElem = form_message.current;
		setTimeout(()=>{
			msgElem?.classList.add('show')
		},100)
		
		setTimeout(()=>{
			msgElem?.classList.remove('show')
			setTimeout(()=>{
				setMessage(null)
			},500)
		},3000)

	})
	
	return(
		<div className={`form-message ${message?.type}`} id='form-message' ref={form_message}>
			<span className='form-message-text'>{message?.text}</span>
		</div>
	)
}

export default FormMessage;