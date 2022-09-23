import { createUserWithEmailAndPassword,signInWithEmailAndPassword , User,AuthError } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";

type TResponse = {
	user?: User | null,
	error?: AuthError | null
}

const createUserWithEmailAndPasswordHandler  = async (email : string , password: string)=> {
	let response : TResponse  = {user: null,error: null }
	await createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			response.user = userCredential.user;
		})
		.catch((error) => {
			response.error = error;
		})
  return response;
}

const signInWithEmailAndPasswordHandler = async (email : string , password: string) => {
	let response : TResponse  = {user: null,error: null }
	await signInWithEmailAndPassword(auth,email,password)
		.then((userCredential)=>{
			response.user = userCredential.user;
		})
		.catch((error) => {
			response.error = error;
		})
	return response;
}

export {createUserWithEmailAndPasswordHandler,signInWithEmailAndPasswordHandler};