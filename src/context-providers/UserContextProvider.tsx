import { User, UserCredential } from "firebase/auth"
import { createContext, FC, ReactNode, useState } from "react"

export type TUserContext = {
	isUserAuthenticated : boolean,
	userAuthInfo?: User ,
	setUserAuthInfo: (user : User | undefined) => void
}
const defaultUserContext:TUserContext = {
	isUserAuthenticated: false,
	userAuthInfo: undefined,
	setUserAuthInfo:()=>{}
}
export const UserContext = createContext(defaultUserContext);

type TUserContextProviderProps = {
	children: ReactNode
}
export const UserContextProvider: FC<TUserContextProviderProps> = ({children}) => {
	const [userInfo,setUserInfo] = useState<User>();
	const setUserAuthInfo = (user: User| undefined) =>{
		setUserInfo( user )
	}
	const userContextValue: TUserContext = {
		isUserAuthenticated: userInfo ? true : false,
		userAuthInfo: userInfo,
		setUserAuthInfo: setUserAuthInfo
	}
	return (
		<UserContext.Provider value={userContextValue}>
			{children}
		</UserContext.Provider>
	)
}