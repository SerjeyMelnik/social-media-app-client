
 const validatePhoneNumber = (phoneNumber:string) => {
	const phonePattern = /^\+?([0-9]{12})?$/;
	const isValidNumber = phoneNumber.match(phonePattern);
	return isValidNumber;
}

export default validatePhoneNumber;