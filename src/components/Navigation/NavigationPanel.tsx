import {FC} from 'react';
import ThemeChanger from '../ThemeChanger';
import { NAVIGATION_PANEL_ITEMS } from '../../site-config/navigation-panel/navigation_panel';
import NavigationItem from './NavigationItem';

const NavigationPanel:FC = () => {
	return ( 
	<div className="nav-panel_wrapper">
		<nav className="nav-panel">
			{
				NAVIGATION_PANEL_ITEMS.map(item => {
					return (<NavigationItem key={item.itemId} {...item}/>)
				})
			}
			<ThemeChanger/> 
		</nav> 
	</div>
	
	);
}
 
export default NavigationPanel;