import {FC} from 'react'
import { useUserContext } from '../../hooks/useUserContext';
import { NavigationItemType } from '../../site-config/navigation-panel/navigation_panel';

const NavigationItem:FC<NavigationItemType> = ({itemName,itemId,itemComponent,showItemForNotAuthUser}) => {
	const {isUserAuthenticated} = useUserContext()
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