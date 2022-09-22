import { RecaptchaVerifier, signInWithPhoneNumber ,ConfirmationResult,AuthError, UserCredential} from "firebase/auth";
import { auth } from "./firebase";


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
type TConfirmPhoneResult = {
	result: UserCredential | null,
	isNewUser: boolean,
	error:AuthError | null
}
const recaptchaInit = () => {
	window.recaptchaVerifier = new RecaptchaVerifier('sign-in-container', {
		'size': 'invisible',
		'callback': (response : Object | null) => {
			console.log(response);
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
		}).catch((error) => {
			// Error; SMS not sent
			result.error = error;
			console.log(error);
		});
	return result;
}

const confirmPhone = async (code: string) => {
	
	let funcResult: TConfirmPhoneResult = {result:null,isNewUser:false,error:null};
	await window.confirmationResult.confirm(code).then((result) => {
		// User signed in successfully.
		funcResult = {
			result:result,
			isNewUser:result.user.metadata.creationTime ? false : true, 
			error: null
		}
		result.user.metadata.creationTime
	}).catch((error) => {
		// User couldn't sign in (bad verification code?)
		console.log(error);
	});
	return funcResult;
}

export { recaptchaInit, signInWithPhoneNumberHandler, confirmPhone }