import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, AuthError, UserCredential } from "firebase/auth";
import { auth } from "./firebase";


const recaptchaInit = () => {
	window.recaptchaVerifier = new RecaptchaVerifier('sign-in-container', {
		'size': 'invisible',
		'callback': (response) => {
			console.log(response);
		}
	}, auth);
}

const signInWithPhoneNumberHandler = async (phoneNumber) => {

	const appVerifier = window.recaptchaVerifier;
	let result = { confirmationResultFunc: null, error: null };
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

const confirmPhone = async (code) => {

	let funcResult = { result: null, isNewUser: false, error: null };
	await window.confirmationResult.confirm(code).then((result) => {
		// User signed in successfully.
		funcResult = {
			result: result,
			isNewUser: result._tokenResponse.isNewUser,
			error: null
		}
		console.log(result);
	}).catch((error) => {
		// User couldn't sign in (bad verification code?)
		funcResult.error = error;
		console.log(error);
	});
	return funcResult;
}

export { recaptchaInit, signInWithPhoneNumberHandler, confirmPhone }