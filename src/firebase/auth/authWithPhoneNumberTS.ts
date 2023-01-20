import { RecaptchaVerifier, signInWithPhoneNumber ,ConfirmationResult,AuthError, UserCredential, User, setPersistence, inMemoryPersistence, browserLocalPersistence} from "firebase/auth";
import { auth } from "../firebase";


declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier,
		confirmationResult:ConfirmationResult
    }
}
export type TConfirmPhoneResult = {
	result?: UserCredential,
	user?: User,
	error?:AuthError 
}
const recaptchaInit = () => {
	window.recaptchaVerifier = new RecaptchaVerifier('sign-in-container', {
		'size': 'invisible',
		'callback': (response : Object | null) => {
		}
	}, auth);
}

const signInWithPhoneNumberHandler = async (phoneNumber: string) => {
	const appVerifier = window.recaptchaVerifier;
	return signInWithPhoneNumber(auth, phoneNumber, appVerifier)
}

const confirmPhone = async (code: string,confirmationResult: ConfirmationResult) => {
	return confirmationResult.confirm(code);
}

export { recaptchaInit, signInWithPhoneNumberHandler, confirmPhone }