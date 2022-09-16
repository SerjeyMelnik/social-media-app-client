import React from 'react';
import useTheme from '../hooks/useTheme';





const ThemeChanger = () => {
	const { theme, setTheme } = useTheme();
	const toggleTheme = () => {
	  setTheme(theme === 'light' ? 'dark' : 'light')
	}

	return ( 
		<div className={`theme-changer ${theme}`}>
			<div className="switcher-container" onClick={toggleTheme}>
				<div className="switcher"></div>
			</div>
		</div>
	 );
}
 
export default ThemeChanger;