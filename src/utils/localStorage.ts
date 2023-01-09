import { User } from "firebase/auth";

type LocalStorageItem = 'user' | 'user-token';
type SetItemToLocalStorage = (itemName: LocalStorageItem, itemValue: string) => void
type RemoveItemFromLocalStorage = (itemName: LocalStorageItem) => void
type GetItemFromLocalStorage = (itemName: LocalStorageItem) => string | null
type GetUserFromLocalStorage = () => User | null
type SetUserToLocalStorage = (user: User) => void
type RemoveUserToLocalStorage = () => void

export const setItemToLocalStorage: SetItemToLocalStorage = (itemName, itemValue) => {
	localStorage.setItem(itemName,itemValue)
}
export const removeItemFromLocalStorage: RemoveItemFromLocalStorage = (itemName) => {
	localStorage.removeItem(itemName)
}
export const getItemFromLocalStorage: GetItemFromLocalStorage = (itemName) => {
	return localStorage.getItem(itemName);
}

export const setUserToLocalStorage: SetUserToLocalStorage = (user) => {
	setItemToLocalStorage('user',JSON.stringify(user))
}
export const getUserFromLocalStorage: GetUserFromLocalStorage = () => {
	return JSON.parse(getItemFromLocalStorage('user') as string)
}
export const removeUserFromLocalStorage: RemoveUserToLocalStorage = () => {
	removeItemFromLocalStorage('user')
}

