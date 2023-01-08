import { User } from "firebase/auth"
import { onSnapshot } from "firebase/firestore"
import { createContext, FC, ReactNode, useEffect, useState } from "react"
import { auth } from "../firebase/firebase"
import { getDocRef } from "../firebase/firestore/getOperation"
import { getShortUserInfoById, getShortUsersInfo, getUserAcountInfo } from "../firebase/firestore/userOperation"

import { UserAccountInfo, UserShort } from "../types/userTypes"

type AccountUserAppState = {
	userShort: UserShort,
	accountInfo: UserAccountInfo,
	userAuthInfo: User,
}
export type TUserContext = {
	isUserAuthenticated : boolean,
	userInfo?: AccountUserAppState,
	login: (user: User) => Promise<void>,
	logout: () => void,
	updateCurrentUserInfo: () => Promise<void>
}
const defaultUserContext:TUserContext = {
	isUserAuthenticated: false,
	userInfo: undefined,
	login: async () => {},
	logout: () => {},
	updateCurrentUserInfo: async () => {}
}
export const UserContext = createContext(defaultUserContext);

type TUserContextProviderProps = {
	children: ReactNode
}
export const UserContextProvider: FC<TUserContextProviderProps> = ({children}) => {
	const [userInfo,setUserInfo] = useState<AccountUserAppState | undefined>(undefined);
	const setUserShort = (userShort: UserShort) => {
		setUserInfo(state => {
			return {
			...state,
			userShort
		} as AccountUserAppState;
	})
	}
	const setAccountInfo = (accountInfo: UserAccountInfo) => {
		setUserInfo(state => {
			return {
			...state,
			accountInfo
		} as AccountUserAppState;
	})
	}
	const setUserAuthInfo = (user: User) => {
		setUserInfo(state => {
			return {
			...state,
			userAuthInfo: user
		} as AccountUserAppState;
	})
	}
	const setUserInfoState = async (user: User) => {
		const userShort = await getShortUserInfoById(user.uid);
		const accountInfo = await getUserAcountInfo(user.uid);
		setUserShort(userShort);
		setUserAuthInfo(user);
		setAccountInfo(accountInfo)
	}
	const login = async (user: User) => {
		setUserInfoState(user)
	}
	const logout = () => {
		setUserInfo(undefined);

	}
	const updateCurrentUserInfo = async () => {
		const userShort = await getShortUserInfoById(userInfo?.userAuthInfo.uid as string);
		const accountInfo = await getUserAcountInfo(userInfo?.userAuthInfo.uid as string);
		setUserShort(userShort);
		setAccountInfo(accountInfo)
	}
	const userContextValue: TUserContext = {
		isUserAuthenticated: userInfo ? true : false,
		userInfo,
		login,
		logout,
		updateCurrentUserInfo
	}
	console.log(auth.currentUser);
	useEffect(()=>{
		if(userInfo){
			const unsub = onSnapshot(getDocRef('users-short',userInfo?.userAuthInfo?.uid as string)
			,async (doc) => {
				setUserShort(doc.data() as UserShort)
			})
			return unsub;
		}
		
	},[])
	return (
		<UserContext.Provider value={userContextValue}>
			{children}
		</UserContext.Provider>
	)
}