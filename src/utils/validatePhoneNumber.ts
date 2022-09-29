

type TValidatePhoneNumber = RegExpMatchArray | null;
type TValidatePhoneNumberProps = string;

function validatePhoneNumber<TValidatePhoneNumberProps> (phoneNumber:string) : TValidatePhoneNumber{
	const phonePattern = /^\+?([0-9]{12})?$/;
	const isValidNumber = phoneNumber.match(phonePattern);
	return isValidNumber;
}

export default validatePhoneNumber;