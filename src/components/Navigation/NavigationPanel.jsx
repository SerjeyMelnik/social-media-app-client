import React from 'react';
import NavigationPanel_Item_chats from './NavigationPanel_Item_chats';
import NavigationPanel_Item_home from './NavigationPanel_Item_home';
import NavigationPanel_Item_notification from './NavigationPanel_Item_notification';
import NavigationPanel_Item_user from './NavigationPanel_Item_user';
import ThemeChanger from '../ThemeChanger';

const NavigationPanel = () => {
	return ( 
	<div className="nav-panel_wrapper">
		<nav className="nav-panel">
			
			<NavigationPanel_Item_home/>
			<NavigationPanel_Item_user/>
			<NavigationPanel_Item_notification/>
			<NavigationPanel_Item_chats/>
			<ThemeChanger/>
		</nav> 
	</div>
	
	);
}
 
export default NavigationPanel;