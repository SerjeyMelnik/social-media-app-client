import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
const firebaseConfigSMelnik = {
	apiKey: "AIzaSyAHLdapNdaOmCLIm-knEzCFHeSEjcliHk8",
	authDomain: "social-media-app-d7804.firebaseapp.com",
	projectId: "social-media-app-d7804",
	storageBucket: "social-media-app-d7804.appspot.com",
	messagingSenderId: "1082956084886",
	appId: "1:1082956084886:web:f175a367e4a88726a5b4b7"
};
// const firebaseConfigSerjeyMelnik = {
// 	apiKey: "AIzaSyA698-4o8zRUVLkGdmTlFCxdNzLkVSPwAI",
// 	authDomain: "social-media-app-9aa0d.firebaseapp.com",
// 	projectId: "social-media-app-9aa0d",
// 	storageBucket: "social-media-app-9aa0d.appspot.com",
// 	messagingSenderId: "786810882746",
// 	appId: "1:786810882746:web:4cd6af7b6b84ad51799083",
// 	measurementId: "G-GYG6VXHXB0"
//   };
const app = initializeApp(firebaseConfigSMelnik);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
(()=>{
	initializeApp(firebaseConfigSMelnik)
})()
export {auth , app, db, storage};