import React, { useEffect, useState, useLayoutEffect } from 'react';



const useTheme = () => {
	const defaultTheme = 'light';
	const localStorageTheme = localStorage.getItem('app-theme');

	const [theme, setTheme] = useState(localStorageTheme || defaultTheme);
	useLayoutEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('app-theme', theme)
	}, [theme])
	return { theme, setTheme }
}

export default useTheme;