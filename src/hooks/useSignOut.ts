import { AuthError, signOut, User } from "firebase/auth"
import React, { FC } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase/firebase"
import { useUserContext } from "./useUserContext"

export type TSignOutFuncProps = {
	successCallback?:()=>void,
	errorCallback?:()=>void
}
export type TUseSignOutHook =  {
	logOutFunc: () => void
}

export function useSignOut(): TUseSignOutHook{
	const {setUserAuthInfo} = useUserContext();

	const successCallbackHandler: () => void = () => {
		setUserAuthInfo(undefined);
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