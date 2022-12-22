import {FC,ReactNode,createContext, useContext} from 'react';
import {UserShort} from '../types/userTypes'
export type ProfileContextType = {
	user?: UserShort,
}
type ProfileContextProviderProps = {
	children: ReactNode,
	user?: UserShort
}
const defaultProfileContext: ProfileContextType = {
	
}
export const ProfileContext = createContext(defaultProfileContext);

	
export const ProfileContextProvider: FC<ProfileContextProviderProps> = ({children,user}) => {
	const contextValue = {
		user,

	}
	return (
		<ProfileContext.Provider value={contextValue}>
			{children}
		</ProfileContext.Provider>
	)
}

export const useProfileContext = () => useContext(ProfileContext);