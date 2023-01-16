import { User } from "firebase/auth";
import { createContext, ReactNode, useState, FC, useEffect, useContext } from "react";
import { app, auth } from "../firebase/firebase";

type AuthContextType = {
	isUserAuthenticated: boolean,
	currentUser: User | null,
	login: (user: User) => void,
	logout: () => void,
}
const defaultAuthContext: AuthContextType  = {
	isUserAuthenticated: false,
	currentUser: null,
	login: async  () => {},
	logout: () => {},
}
const AuthContext = createContext(defaultAuthContext);
type AuthProviderProps = {
	children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({children}) => {
	const [currentUser,setCurrentUser] = useState<User | null>(null);
	const [loading,setLoading] = useState<boolean>(true);
	const login = (user: User) => {
		setCurrentUser(user)
	}
	const logout = () => {
		setCurrentUser(null)
	}
	const contextValue = {
		isUserAuthenticated: !!currentUser,
		currentUser,
		login,
		logout,
	}
	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			setCurrentUser(user)
			setLoading(false)
		})
	})
	if(loading) {
		return (<>Loading...</>)
	}
	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthProvider = () => useContext(AuthContext);