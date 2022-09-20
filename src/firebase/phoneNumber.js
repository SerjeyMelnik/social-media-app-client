import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase";

const recaptchaInit = () => {
	window.recaptchaVerifier = new RecaptchaVerifier('sign-in-container', {
		'size': 'invisible',
		'callback': (response) => {
			console.log(response);
		}
	}, auth);
}

const signInWithPhoneNumberHandler = (phoneNumber) => {

	const appVerifier = window.recaptchaVerifier;
	signInWithPhoneNumber(auth, phoneNumber, appVerifier)
		.then((confirmationResult) => {
			// SMS sent. Prompt user to type the code from the message, then sign the
			// user in with confirmationResult.confirm(code).
			window.confirmationResult = confirmationResult;
			console.log(confirmationResult);
			confirmPhone()
			// ...
		}).catch((error) => {
			// Error; SMS not sent
			// ...
			console.log(error);
		});

}

const confirmPhone = () => {
	const code = prompt();
	window.confirmationResult.confirm(code).then((result) => {
		// User signed in successfully.
		const user = result.user;
		console.log(result);
		// ...
	}).catch((error) => {
		// User couldn't sign in (bad verification code?)
		// ...
		console.log(error);
	});
}

export { recaptchaInit, signInWithPhoneNumberHandler, confirmPhone }