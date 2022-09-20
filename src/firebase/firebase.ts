import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
	apiKey: "AIzaSyAHLdapNdaOmCLIm-knEzCFHeSEjcliHk8",
	authDomain: "social-media-app-d7804.firebaseapp.com",
	projectId: "social-media-app-d7804",
	storageBucket: "social-media-app-d7804.appspot.com",
	messagingSenderId: "1082956084886",
	appId: "1:1082956084886:web:f175a367e4a88726a5b4b7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export  {auth , app};