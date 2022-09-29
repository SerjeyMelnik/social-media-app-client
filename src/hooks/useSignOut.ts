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

export function useSignOutFunc(): TUseSignOutHook{
	const {setUserAuthInfo} = useUserContext();
	const navigateTo = useNavigate()

	const successCallbackHandler: () => void = () => {
		setUserAuthInfo(undefined);
		navigateTo('/')
	}
	const errorCallbackHandler: (error: AuthError) => void = (error) => {
		console.log(error);
		
	}
	 const logOutFunc = async () => {
	 await signOut(auth)
		.then(successCallbackHandler)
		.catch(errorCallbackHandler)
	}
	return {
		logOutFunc
	};
	
}