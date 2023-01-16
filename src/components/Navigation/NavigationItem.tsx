import {FC} from 'react'
import { useAuthProvider } from '../../context-providers/AuthProvider';
import { NavigationItemType } from '../../site-config/navigation-panel/navigation_panel';

const NavigationItem:FC<NavigationItemType> = ({itemName,itemId,itemComponent,showItemForNotAuthUser}) => {
	const {isUserAuthenticated} = useAuthProvider()
	if (!showItemForNotAuthUser && !isUserAuthenticated){
		return null;
	}
	return (
		<div className="navigation-item">
			{itemComponent()}
		</div>
	);
}
 
export default NavigationItem;