import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return ( 
		<header className='header'>
			<div className="header-content">
				<Link to='/posts' className='header-link'>
					<h1 className='header-link-logo'>Home</h1>
				</Link>
			</div>	
		</header>
	 );
}
 
export default Header;