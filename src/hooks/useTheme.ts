import React, { useEffect, useState, useLayoutEffect } from 'react';

type ThemeType = 'light' | 'dark';
type TUseTheme = {
	theme: ThemeType,
	setTheme: React.Dispatch<React.SetStateAction<ThemeType>>
}
const useTheme = (): TUseTheme => {
	const defaultTheme = 'light';
	const localStorageTheme = localStorage.getItem('app-theme') as ThemeType;

	const [theme, setTheme] = useState<ThemeType>(localStorageTheme || 'light');
	useLayoutEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('app-theme', theme)
	}, [theme])
	return { theme, setTheme }
}

export default useTheme;