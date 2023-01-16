import { AuthError, signOut } from "firebase/auth"
import { useAuthProvider } from "../context-providers/AuthProvider"
import { auth } from "../firebase/firebase"

export type TSignOutFuncProps = {
	successCallback?:()=>void,
	errorCallback?:()=>void
}
export type TUseSignOutHook =  {
	logOutFunc: () => void
}

export function useSignOut(): TUseSignOutHook{
	const {logout} = useAuthProvider();

	const successCallbackHandler: () => void = () => {
		logout()
	}
	const errorCallbackHandler: (error: AuthError) => void = (error) => {
		console.log(error,'error');
	}
	const logOutFunc = async () => {
	
	 await signOut(auth)
		.then(()=>{
			successCallbackHandler()
		})
		.catch((e)=>{
			errorCallbackHandler(e)
		})
	}
	return {
		logOutFunc
	};
	
}