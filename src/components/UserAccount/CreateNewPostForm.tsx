import { FC, useState } from "react";

type FormType = {
	description?: string,
	pictures?: string[]
}
const defaultFormState:FormType = {
	description: '',
	pictures:[]
}
const CreateNewPostForm:FC = () => {
	const [form,setForm] = useState<FormType>(defaultFormState);
	
	const setFormField = (field:keyof FormType,data: FormType[keyof FormType]) => {
		setForm(state => ({
			...state,
			[field]: data
		}))
		return field;
	}
	
	return ( 
		<div className="create-new-post-form-wrapper">
			<form >

			</form>
		</div>
	 );
}
 
export default CreateNewPostForm;