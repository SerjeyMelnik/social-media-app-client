
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSignOut } from '../../hooks/useSignOut';
import { useUserContext } from '../../hooks/useUserContext';
type TUserPopUpProps = {
	isShowPopUp: boolean,
	togglePopUp: () => void,
}
type TUserPopUpList = {
	togglePopUp:() => void
}
const UserPopUpLinkListNotAuth:FC<TUserPopUpList> = ({togglePopUp}) => {
	return (
		<ul className='popUp-content-list'>
			<li className='popUp-content-item'>
				<Link to='/login' onClick={togglePopUp}>SignIn</Link>
			</li>
			<li className='popUp-content-item'>
				<Link to='/registration' onClick={togglePopUp}>SignUp</Link>
			</li>
		</ul>
	)
}
const UserPopUpLinkListIsAuth:FC<TUserPopUpList> = ({togglePopUp}) => {
	const {logOutFunc} = useSignOut();
	return (
		<ul className='popUp-content-list'>
			<li className='popUp-content-item'>
				<Link to='/user-account' onClick={togglePopUp}>Account</Link>
			</li>
			<li className='popUp-content-item'>
				<Link to='/' onClick={logOutFunc}>Logout</Link>
			</li>
		</ul>
	)
}

const UserPopUp: FC<TUserPopUpProps> = ({isShowPopUp,togglePopUp}) => {
	const {isUserAuthenticated} = useUserContext()
	return ( 

		<div className={`popUp popUp-user ${isShowPopUp ? 'show' : 'hide'}`}>
			<div className="arrow shadow"></div>
			<div className="popUp-content">
				{
					isUserAuthenticated ?
					<UserPopUpLinkListIsAuth togglePopUp={togglePopUp}/> :
					<UserPopUpLinkListNotAuth togglePopUp={togglePopUp}/>
				}
			</div>
			<div className="arrow"></div>
		</div>
	 );
}
 
export default UserPopUp;