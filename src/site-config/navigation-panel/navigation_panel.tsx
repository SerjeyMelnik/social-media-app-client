import NavigationItemChats from "../../components/Navigation/NavigationItemChats";
import NavigationItemHome from "../../components/Navigation/NavigationItemHome";
import NavigationItemNotification from "../../components/Navigation/NavigationItemNotification";
import NavigationItemUser from "../../components/Navigation/NavigationItemUser";

enum ItemNamesEnum{
	home = 'home',
	user = 'user',
	notification = 'notification',
	chats = 'chats'
}
export type ItemNamesType = keyof typeof ItemNamesEnum;

export type NAVIGATION_PANEL_ITEM = {
	itemName: ItemNamesType,
	itemId: ItemNamesType,
	showItemForNotAuthUser: boolean,
	itemComponent: <T>(props?: T) => React.ReactElement

}
export const NAVIGATION_PANEL_ITEMS:NAVIGATION_PANEL_ITEM[] = [
	{	
		itemName: 'home',
		itemId: 'home',
		showItemForNotAuthUser: true,
		itemComponent: (props) => <NavigationItemHome {...props}/>
	},
	{	
		itemName: 'user',
		itemId: 'user',
		showItemForNotAuthUser: true,
		itemComponent: (props) => <NavigationItemUser {...props}/>
	},
	{	
		itemName: 'notification',
		itemId: 'notification',
		showItemForNotAuthUser: false,
		itemComponent: (props) => <NavigationItemNotification {...props}/>
	},
	{	
		itemName: 'chats',
		itemId: 'chats',
		showItemForNotAuthUser: false,
		itemComponent: (props) => <NavigationItemChats {...props}/>
	}
]