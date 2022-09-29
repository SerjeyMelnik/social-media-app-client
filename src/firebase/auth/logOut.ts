import { AuthError, signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../../hooks/useUserContext"
import { auth } from "../firebase"

export type TSignOutFuncProps = {
	successCallback?:()=>void,
	errorCallback?:()=>void
}
export const SignOutFunc = async () => {
	const {setUserAuthInfo} = useUserContext();
	const navigateTo = useNavigate()

	const successCallbackHandler: () => void = () => {
		setUserAuthInfo(undefined);
		navigateTo('/')
	}
	const errorCallbackHandler: (error: AuthError) => void = (error) => {
		console.log(error);
		
	}
	 const logOut:() => void = async () => {
		await signOut(auth)
		.then(successCallbackHandler)
		.catch(errorCallbackHandler)
	}
	return logOut;
	
}