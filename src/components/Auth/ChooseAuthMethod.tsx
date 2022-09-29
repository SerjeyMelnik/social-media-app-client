import React, { FC } from "react";
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';


export type TAuthMethod = 'phone'| 'email' | null;

type TChooseAuthMethodProps = {
	title: string,
	setAuthMethod: (signInType: TAuthMethod) => void;
}
const ChooseAuthMethod: FC<TChooseAuthMethodProps> = ({title,setAuthMethod}) => {

	return(
		<div className="reg_form form">
			
				<h3 className='form-title'>{title}</h3>

				<div className="form-inner">

					<button className='button button-choose-method'  onClick={()=>{setAuthMethod('phone')}}>
						With phone number
						<PhoneAndroidRoundedIcon/>
					</button>

					<button className='button button-choose-method' onClick={()=>{setAuthMethod('email')}}>
						With email and password
						<EmailRoundedIcon/>
					</button>
				</div>
		</div> 
	)
}

export default ChooseAuthMethod;