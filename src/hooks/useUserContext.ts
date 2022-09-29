import { useContext } from "react"
import { TUserContext, UserContext } from "../context-providers/UserContextProvider"


export const useUserContext = (): TUserContext =>{

	const userContextValue = useContext(UserContext);

	return userContextValue;
}