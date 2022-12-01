import { FC, useState, FormEventHandler} from "react";
import CustomInput from "../CustomElements/CustomInput";
import CustomPictureUpload from "../CustomElements/CustomPictureUpload";

type CreateNewPostFormType = {
	description: {
		value?: string,
		error?: string
	},
	pictures: {
		value?: File[],
		error?: string
	}
}
const defaultFormState:CreateNewPostFormType = {
	description: {
		value: '',
		error: ''
	},
	pictures: {
		value: [],
		error: ''
	}
}
const CreateNewPostForm:FC = () => {
	const [form,setForm] = useState<CreateNewPostFormType>(defaultFormState);
	
	const setFormField = (field:keyof CreateNewPostFormType,data: CreateNewPostFormType[keyof CreateNewPostFormType]) => {
		setForm(state => ({
			...state,
			[field]: data
		}))
	}
	const changeFieldValue = ( e: React.ChangeEvent<HTMLInputElement>) => {
		setForm(state => {
			const targetErrorMsg = e.target.dataset.errorMsg ??  '';
			return ({
				...state,
				[e.target.name]:{
						error: targetErrorMsg,
						value: e.target.value
					}
			})
		})
	}
	const changePicturesField = (pictures:File[],error?:string) => {
		const data = {
			value: [...form.pictures.value as File[], ...pictures],
			error
		}
		setFormField('pictures',data)
	}
	
	return ( 
		<div className="create-new-post-form-wrapper">
			<form >
				<div className="post">
					<CustomInput changeFieldValue={changeFieldValue}
								name='description'
								placeholder="Type description to post..."
								type="text"
								error={form.description.error}
								value={form.description.value}/>
					<CustomPictureUpload changePicturesField={changePicturesField}
										/>
				</div>
				
			</form>
		</div>
	 );
}
 
export default CreateNewPostForm;