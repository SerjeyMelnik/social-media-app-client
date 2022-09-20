import React, { FC } from 'react';
import { Link } from 'react-router-dom';
type TUserPopUpProps = {
	isShowPopUp: boolean
}
const UserPopUp: FC<TUserPopUpProps> = ({isShowPopUp}) => {
	return ( 

		<div className={`popUp popUp-user ${isShowPopUp ? 'show' : 'hide'}`}>
			<div className="arrow shadow"></div>

			<div className="popUp-content">
				<ul className='popUp-content-list'>
					<li className='popUp-content-item'>
						<Link to='/login'>SignIn</Link>
					</li>
					<li className='popUp-content-item'>
						<Link to='/registration'>SignUp</Link>
					</li>
				</ul>
			</div>

			<div className="arrow "></div>
		</div>
	 );
}
 
export default UserPopUp;