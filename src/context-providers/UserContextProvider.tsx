import { User } from "firebase/auth"
import { createContext, FC, ReactNode, useState } from "react"
import { getFullUserInfo } from "../firebase/firestore/userOperation"
import { IUserAccountInfo, TUserFull } from "../types/userTypes"

export type TUserContext = {
	isUserAuthenticated : boolean,
	userInfo?: IUserAccountInfo ,
	setUserAuthInfo: (user : User | undefined) => void,
	updateUserAccountInfo: () => void,
}
const defaultUserContext:TUserContext = {
	isUserAuthenticated: false,
	userInfo: undefined,
	setUserAuthInfo:()=>{},
	updateUserAccountInfo:()=>{}
}
export const UserContext = createContext(defaultUserContext);

type TUserContextProviderProps = {
	children: ReactNode
}
export const UserContextProvider: FC<TUserContextProviderProps> = ({children}) => {
	const [userInfo,setUserInfo] = useState<IUserAccountInfo | undefined>();
	const setUserAuthInfo = async (user: User | undefined) =>{
		if (user){
			const fullUserInfo = await getFullUserInfo(user?.uid as string)
			const userAuthInfo:IUserAccountInfo | undefined = {
				userFull: fullUserInfo,
				userAuthInfo: user
			}
			setUserInfo( userAuthInfo )
		}
		else if (!user){
			setUserInfo( undefined )
		}
	}
	const updateUserAccountInfo = async () => {
		const fullUserInfo = await getFullUserInfo(userInfo?.userAuthInfo?.uid as string)
		setUserInfo((state) => {
			return {
				...state,
				userFull:fullUserInfo
			}
		})
	}
	const setUserAccountInfo = (userFull:TUserFull) => {
		setUserInfo((state) => {
			return {
				...state,
				userFull
			}
		})
	}
	const userContextValue: TUserContext = {
		isUserAuthenticated: userInfo ? true : false,
		userInfo,
		setUserAuthInfo,
		updateUserAccountInfo
	}
	
	return (
		<UserContext.Provider value={userContextValue}>
			{children}
		</UserContext.Provider>
	)
}