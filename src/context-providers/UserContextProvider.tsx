import { User } from "firebase/auth"
import { onSnapshot } from "firebase/firestore"
import { createContext, FC, ReactNode, useEffect, useState } from "react"
import { auth } from "../firebase/firebase"
import { getDocRef } from "../firebase/firestore/getOperation"
import { getShortUserInfoById, getUserAcountInfo } from "../firebase/firestore/userOperation"
import { UserAccountInfo, UserShort } from "../types/userTypes"
import { getUserFromLocalStorage, removeUserFromLocalStorage, setUserToLocalStorage } from "../utils/localStorage"
import { useAuthProvider } from "./AuthProvider"

// type AccountUserAppState = {
// 	userShort: UserShort,
// 	accountInfo: UserAccountInfo,
// } | undefined
export type TUserContext = {
	userShort: UserShort | null,
	accountInfo: UserAccountInfo | null,
}
const defaultUserContext:TUserContext = {
	userShort: null,
	accountInfo: null,
}
export const UserContext = createContext(defaultUserContext);

type TUserContextProviderProps = {
	children: ReactNode
}
export const UserContextProvider: FC<TUserContextProviderProps> = ({children}) => {
	const {currentUser} = useAuthProvider()
	const [userShort,setUserShort] = useState<UserShort | null>(null);
	const [accountInfo,setAccountInfo] = useState<UserAccountInfo | null>(null);
	
	const userContextValue: TUserContext = {
		userShort,
		accountInfo
	}
	
	useEffect(()=>{
		if(currentUser){
			const unsub = onSnapshot(getDocRef('users-short',currentUser.uid)
			,async (doc) => {
				setUserShort(doc.data() as UserShort)
			})
			return unsub;
		}
	},[currentUser])
	useEffect(()=>{
		if(currentUser){
			const unsub = onSnapshot(getDocRef('users-account-info',currentUser.uid)
			,async (doc) => {
				setAccountInfo(doc.data() as UserAccountInfo)
			})
			return unsub;
		}
	},[currentUser])
	return (
		<UserContext.Provider value={userContextValue}>
			{children}
		</UserContext.Provider>
	)
}