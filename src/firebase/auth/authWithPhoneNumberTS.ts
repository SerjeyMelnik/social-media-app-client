import { RecaptchaVerifier, signInWithPhoneNumber ,ConfirmationResult,AuthError, UserCredential, User} from "firebase/auth";
import { auth } from "../firebase";


declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier,
		confirmationResult:ConfirmationResult
    }
}
type TSignInWithPhoneNumberResult = {
	confirmationResultFunc: ConfirmationResult | null,
	error: AuthError | null
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
	let result : TSignInWithPhoneNumberResult = {confirmationResultFunc: null,error: null};

	
	await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
		.then((confirmationResult) => {
			// SMS sent. Prompt user to type the code from the message, then sign the
			// user in with confirmationResult.confirm(code).
			window.confirmationResult = confirmationResult;
			result.confirmationResultFunc = confirmationResult;
		}).catch((error: AuthError) => {
			// Error; SMS not sent
			result.error = error;
			console.log(error);
		});
	return result;
}

const confirmPhone = async (code: string) => {
	
	let funcResult: TConfirmPhoneResult = {};
	await window.confirmationResult.confirm(code).then((result:UserCredential) => {
		// User signed in successfully.
		

		
		funcResult = {
			result: result,
			user: result.user
		}	
	}).catch((error) => {
		funcResult= {
			error: error
		}
	});
	return funcResult;
}

export { recaptchaInit, signInWithPhoneNumberHandler, confirmPhone }