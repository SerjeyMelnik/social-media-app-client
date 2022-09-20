import { createUserWithEmailAndPassword , User,AuthError } from "firebase/auth";
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
			// Signed in 
			const user = userCredential.user;
			console.log(user);
			
			response.user = user;
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			response.error = error;
			console.log(error.message);
		})
  return response;
}

export {createUserWithEmailAndPasswordHandler};